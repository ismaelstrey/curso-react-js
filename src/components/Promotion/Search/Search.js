import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PromotionList from "components/Promotion/List/List";
import axios from "axios";
import "./Search.css";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};
    if (search) {
      params.title_like = search;
    }
    axios
      .get(
        "http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id",
        { params }
      )
      .then((res) => {
        setPromotions(res.data);
      })
      .catch((error) => console.log("Erro ao acessar API", error));
  }, [search]);
  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promotion: {search}</h1>
        <Link className="promotion-search__link" to="/create">
          Nova Promoção
        </Link>
      </header>

      <input
        type="search"
        className="promotion-search__input"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        placeholder="Buscar"
      />
      <PromotionList promotions={promotions} loading={!promotions.length} />
    </div>
  );
};
export default PromotionSearch;
