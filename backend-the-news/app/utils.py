def calculate_streak(email):
    reads = NewsletterRead.query.filter_by(email=email) \
        .order_by(NewsletterRead.timestamp.desc()).all()

    if not reads:
        return 0

    read_dates = {read.timestamp.date() for read in reads if read.timestamp.weekday() != 6}

    if not read_dates:
        return 0

    sorted_dates = sorted(read_dates, reverse=True)

    streak = 0
    prev_date = None

    for read_date in sorted_dates:
        if prev_date is None:
            streak = 1
            prev_date = read_date
            continue

        delta = (prev_date - read_date).days

        if delta == 1 or (delta == 2 and prev_date.weekday() == 0):
            streak += 1
        else:
            break

        prev_date = read_date

    # Log para depuração
    print(f"Streak calculado: {streak}, Max Streak atual: {reads[0].max_streak}")

    if streak > 0 and (reads[0].max_streak is None or streak > reads[0].max_streak):
        for read in reads:
            read.max_streak = streak
        db.session.commit()

    return streak