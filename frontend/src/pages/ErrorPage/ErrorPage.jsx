import { useRouteError } from "react-router-dom";
import './ErrorPage.css'
export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page">
      <div className="icone-sad">
      <i className="bi bi-emoji-frown"></i>
      </div>
      <div className="text">
      <h4 className="h4-errorPage">INTERNAL SERVER ERROR</h4>
      <h1 className="h1-errorPage">500</h1>
      <p className="p-errorPage mt-4">Oops! Ocorreu algo inesperado. Alguma coisa não esta funcionado corretamente.</p>
      <p className="p-errorPage mb-4">Por favor, entre em contato com o adiministrador</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
      <button className="a-errorPage"><a href="/" >Voltar para o inicío</a></button>
      </div>
      
    </div>
  );
}