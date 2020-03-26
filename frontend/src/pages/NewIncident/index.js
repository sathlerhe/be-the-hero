import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
	const ongId = localStorage.getItem("ongId");

	const history = useHistory();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState();

	async function handleNewIncident(e) {
		e.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post("incidents", data, {
				headers: {
					Authorization: ongId
				}
			});

			await history.push("/profile");
		} catch (err) {
			alert("Erro ao criar novo caso. Tente novamente!");
		}
	}

	return (
		<div className="newIncidentContainer">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>
						Descreva o caso detalhadamente para encontrar um herói para resolver
						isso
					</p>

					<Link className="backLink" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar para home
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input
						type="text"
						placeholder="Título do caso"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>

					<textarea
						placeholder="Descreva o caso, para ficar mais entendível"
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>

					<input
						type="number"
						placeholder="Valor em reais"
						value={value}
						onChange={e => setValue(e.target.value)}
					/>

					<button className="button" type="submit">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
