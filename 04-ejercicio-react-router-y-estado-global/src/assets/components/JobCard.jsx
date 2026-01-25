import { Link } from './Link.jsx'
import { JobCardApplyButton, JobCardFavoriteButton } from './JobCardComponents.jsx';

import styles from './JobCard.module.css';

export function JobCard({job}) {

    return (
        <article
            className={styles.jobListCard}
            data-tech={job.data.tech}
            data-location={job.data.location}
            data-exp-level={job.data.expLevel}
        >
            <Link href={`/job/${job.id}`}>
                <header>
                    <h3>{job.titulo}</h3>
                    <small>
                        <span>{job.empresa}</span> | <span>{job.ubicacion}</span>
                    </small>
                </header>

                <p>{job.descripcion}</p>
            </Link>

            <section className={styles.buttonSection}>
                <JobCardApplyButton jobId={job.id} />
                <JobCardFavoriteButton jobId={job.id}/> 
            </section>
            
        </article>
    )
};
