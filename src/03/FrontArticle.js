import Like from '../04/Like';
import React from 'react'
import style from './ForntEnd.module.css';

function FrontArticle({ title, href, contents }) {
  return (
    <>
      <article className={style.divArticle} id="divHtml">
        <h2>{title}</h2>
        <div>
          <div className={style.divimg}>
            <img src={href} alt={title} />
          </div>
          <p>
            {contents}
          </p>
        </div>
      </article>
      <Like/>
        </>
      )
}
      export default FrontArticle