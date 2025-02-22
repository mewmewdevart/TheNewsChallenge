import { Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";

interface CardData {
  id: number;
  title: string;
  href: string;
}

interface SearchBarWithCardsProps {
  cardsData: CardData[];
}

const SearchBarWithCards: React.FC<SearchBarWithCardsProps> = ({
  cardsData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleCardClick = (href: string) => {
    window.open(href, "_blank");
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    href: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      window.open(href, "_blank");
    }
  };

  return (
    <div>
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar postagem..."
          className="p-2 border border-(--color-brand-neutral-500) w-full pl-10 hover:rounded-none"
          aria-label="Pesquisar postagem"
        />
        <span
          className="absolute left-3 text-(--color-brand-neutral-500)"
          aria-hidden="true"
        >
          🔍
        </span>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 min-h-[325px]">
        {currentCards.length > 0 ? (
          currentCards.map((card) => (
            <div
              key={card.id}
              tabIndex={0}
              role="button"
              aria-label={`Card: ${card.title}`}
              className="bg-gray-200 hover:bg-yellow-400 p-4 cursor-pointer transition-all duration-300 h-[100px]"
              onClick={() => handleCardClick(card.href)} 
              onKeyDown={(e) => handleCardKeyDown(e, card.href)}
            >
				<img src="" alt="" />
              <h3 className="font-bold">{card.title}</h3>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-(--color-brand-neutral-500)">
            Nenhuma postagem encontrada.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#000000",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#FFCE04",
              color: "#000",
            },
            "& .MuiPaginationItem-page:hover": {
              backgroundColor: "#FFCE04",
              color: "#000",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBarWithCards;