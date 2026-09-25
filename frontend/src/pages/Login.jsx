import { Link } from "react-router";

function Login() {
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
          <h1>Bem-vindo de volta</h1>

          <p>
            Entre na sua conta para continuar organizando sua rotina.
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

          <label>
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
            />
          </label>

          <div className="form__options">
            <label className="checkbox">
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <Link to="/forgot-password">
              Esqueci minha senha
            </Link>
          </div>

          <button type="button" className="button button--primary">
            Entrar
          </button>
        </form>

        <p className="auth-footer">
          Ainda não possui uma conta?{" "}
          <Link to="/register">Criar conta</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;