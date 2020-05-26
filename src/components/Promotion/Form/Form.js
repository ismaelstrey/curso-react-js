import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Form.css";

const initialValues = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

function PromotionForm({id}) {

  const [values, setValues] = useState(id ? null: initialValues);
  const [loading, setLoading] = useState(true)
  const history = useHistory();
useEffect(() => {
  if(id){
    axios.get(`http://localhost:5000/promotions/${id}`)
    .then((response) => {
      console.log(response.data)
      setValues(response.data)
      setLoading(false)
    })
  }
},[id])
  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id

    ? `http://localhost:5000/promotions/${id}`
    : 'http://localhost:5000/promotions'
    axios[method](url, values).then((response) => {
      history.push("/");
    });
  }

  const back = () => history.goBack();
  return (
   <div className="promotion-form__container">
                <header>
                  <h1>Promo Show</h1>
                  <h2>Nova Promoção</h2>
                  <button className="promotion-form__button" onClick={back}>
                    Cancelar
                  </button>
                </header>
                {loading
                      ?(<div className="promotion-form__loading"><PropagateLoader
                            size={20}
                            align="center"
                            color={"#123abc"}
                            loading={loading}

                          /><p>Carregando...</p></div>)
                        :(
                <form onSubmit={onSubmit}>
                  <div className="promotion-form__group">
                    <label htmlFor="title">Título</label>
                    <input id="title" name="title" type="text" onChange={onChange} value={values.title} />
                  </div>
                  <div className="promotion-form__group">
                    <label htmlFor="url">Link</label>
                    <input id="url" name="url" type="text" onChange={onChange} value={values.url} />
                  </div>
                  <div className="promotion-form__group">
                    <label htmlFor="imageUrl">Imagem (URL)</label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      type="text"
                      onChange={onChange}
                      value={values.imageUrl}
                    />
                  </div>
                  <div className="promotion-form__group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" name="price" type="number" onChange={onChange} value={values.price}  />
                  </div>

                  <div>
                    <button type="submit">Salvar</button>
                  </div>
                </form>
              )}
              </div>
  );
}

export default PromotionForm;
