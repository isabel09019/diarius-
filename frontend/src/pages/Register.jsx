import { Link } from "react-router";

function Register() {
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
          <h1>Crie sua conta</h1>

          <p>
            Comece a organizar sua rotina de forma simples.
          </p>
        </div>

        <form className="form">
          <label>
            Nome
            <input
              type="text"
              placeholder="Seu nome"
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              placeholder="voce@email.com"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              placeholder="Crie uma senha"
            />
          </label>

          <label>
            Confirmar senha
            <input
              type="password"
              placeholder="Repita sua senha"
            />
          </label>

          <button type="button" className="button button--primary">
            Criar minha conta
          </button>
        </form>

        <p className="auth-footer">
          Já possui uma conta?{" "}
          <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;