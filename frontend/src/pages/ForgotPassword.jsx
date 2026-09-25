import { Link } from "react-router";

function ForgotPassword() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand__mark">D</div>

          <div>
            <strong>Diarius</strong>
            <span>Organize sua rotina</span>
          </div>
        </div>

        <div className="auth-header">
          <h1>Recuperar senha</h1>

          <p>
            Informe seu e-mail para receber as instruções
            de recuperação.
          </p>
        </div>

        <form className="form">
          <label>
            E-mail
            <input
              type="email"
              placeholder="voce@email.com"
            />
          </label>

          <button type="button" className="button button--primary">
            Enviar instruções
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/login">Voltar para o login</Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;