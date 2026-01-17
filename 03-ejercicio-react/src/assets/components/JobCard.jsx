import { useState } from "react";

import styles from './JobCard.module.css';

export function JobCard({job}) {
    const [
        isApplied,
        setIsApplied
    ] = useState(false)

    function handleClick() {
        setIsApplied(!isApplied);
    }

    const btnText= isApplied ? 'Aplicado' : 'Aplicar';
    const btnClass = isApplied ? styles.btnApplied : '';

    return (
        <article
            className={styles.jobListCard}
            data-tech={job.data.tech}
            data-location={job.data.location}
            data-exp-level={job.data.expLevel}
        >
            <a href="#.hmtl">
                <header>
                    <h3>{job.titulo}</h3>
                    <small>
                        <span>{job.empresa}</span> | <span>{job.ubicacion}</span>
                    </small>
                </header>

                <p>{job.descripcion}</p>
            </a>

            <button
                className={`btn-std ${btnClass}`}
                onClick={handleClick}
            >
                {btnText}
            </button>
        </article>
    )
};
