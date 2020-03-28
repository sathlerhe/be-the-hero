import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [city, setCity] = useState("");
	const [uf, setUf] = useState("");

	const history = useHistory();

	async function handleRegister(e) {
		e.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {

			const res = await api.post("ongs", data);
			const otherOngs = await api.get("ongs");

			console.log(otherOngs);

			alert(`Seu ID é ${res.data.id}`);

			history.push("/");
		} catch (err) {
			alert(`Erro no cadastro, tente novamente.`);
		}
	}

	return (
		<div className="registerContainer">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>
						Faça seu Cadastro, entre na plataforma e ajude pessoas a encontrarem
						os casos da sua ONG.
					</p>

					<Link className="backLink" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Já tenho cadastro
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="Nome da ONG"
						value={name}
						onChange={e => setName(e.target.value)}
						required={true}
					/>

					<input
						type="email"
						placeholder="seuemail@exemplo.com"
						value={email}
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						onChange={e => setEmail(e.target.value)}
						required={true}
					/>

					<input
						type="tel"
						pattern="^\d{2}\d{5}\d{4}$"
						placeholder="27123456789"
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
						required={true}
					/>

					<div className="inputGroup">
						<input
							type="text"
							placeholder="Cidade"
							value={city}
							onChange={e => setCity(e.target.value)}
							required={true}
						/>
						<input
							type="text"
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={e => setUf(e.target.value)}
							required={true}
							pattern="^[A-Z a-z]{2}"
						/>
					</div>

					<button className="button" type="submit">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
