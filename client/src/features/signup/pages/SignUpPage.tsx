import { useForm } from "react-hook-form";
import styles from "./SignUpPage.module.scss";

function SignUpPage() {

    const {handleSubmit, register, formState : {errors, isSubmitting}} = useForm({})

    const submit = handleSubmit((credentials) => {
        console.log(credentials);
    })

  return (
    <div className="d-flex flex-fill align-items-center justify-content-center">
      <form onSubmit={submit}  className={`${styles.form} d-flex flex-column card p-20`}>
        <h2 className="mb-10">Inscription</h2>
        
        <div className="mb-15 d-flex flex-column">
          <label className="mb-5" htmlFor="name">
            Nom
          </label>
          <input {...register("name")} type="text" name="name" placeholder="votre nom" />
          {errors.name && <p className="p-5"> {String(errors.name.message)}</p>}
        </div>
        
        <div className="mb-15 d-flex flex-column">
          <label className="mb-5" htmlFor="email">
            Email
          </label>
          <input {...register("email")} type="text" name="email" placeholder="votre adresse mail" />
          {errors.email && <p className="p-5"> {String(errors.email.message)}</p>}
        </div>
        
        <div className="mb-30 d-flex flex-column">
          <label className="mb-5" htmlFor="password">
            Password
          </label>
          <input {...register("password")} type="password" name="password" placeholder="mot de passe" />
          {errors.password && <p className="p-5"> {String(errors.password.message)}</p>}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary"> valider </button>
      </form>
    </div>
  );
}

export default SignUpPage;
