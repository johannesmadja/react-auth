import { useForm } from "react-hook-form";
import styles from "./SignUpPage.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../services/userService";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Le nom est obligatoire")
    .min(2, "A real name please"),
  email: yup
    .string()
    .required("L'adresse mail est obligatoire")
    .email("Votre adresse email est invalide"),
  password: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(8, "Le mot de passe doit faire au moins 8 caractère"),
});

type SignUpFormValue = yup.InferType<typeof validationSchema>;

function SignUpPage() {
  const initialValues: SignUpFormValue = {
    name: "",
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      await createUser(credentials);
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
    console.log(credentials);
  });

  return (
    <div className="d-flex flex-fill align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Inscription</h2>

        <div className="mb-15 d-flex flex-column">
          <label className="mb-5" htmlFor="name">
            Nom
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="votre nom"
          />
          {errors.name && (
            <p className="p-5 form-error"> {String(errors.name.message)}</p>
          )}
        </div>

        <div className="mb-15 d-flex flex-column">
          <label className="mb-5" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            name="email"
            placeholder="votre adresse mail"
          />
          {errors.email && (
            <p className="p-5 form-error"> {String(errors.email.message)}</p>
          )}
        </div>

        <div className="mb-30 d-flex flex-column">
          <label className="mb-5" htmlFor="password">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="mot de passe"
          />
          {errors.password && (
            <p className="p-5 form-error"> {String(errors.password.message)}</p>
          )}
        </div>

        {errors.root?.serverError && (
          <p className="p-5 form-error">{errors.root.serverError.message}</p>
        )}

        <button disabled={isSubmitting} className="btn btn-primary">
          {" "}
          valider{" "}
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
