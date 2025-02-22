import { useState, useEffect } from 'react';

const useResponsiveness = () => {
	const [isMobile, setIsMobile] = useState(false);

	const checkResponsiveness = () => {
		if (window.innerWidth <= 900) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		checkResponsiveness();
		window.addEventListener('resize', checkResponsiveness);
		return () => {
			window.removeEventListener('resize', checkResponsiveness);
		};
	}, []);

	return isMobile;
};

export default useResponsiveness;