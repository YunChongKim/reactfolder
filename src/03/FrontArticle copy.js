import React from 'react'

 function FrontArticle(probs) {
  return (
    <div>
      <article id="divHtml">
                <h2>{probs.title}</h2>
                <div>
                    <div class="divimg">
                        <img src={probs.href} alt='probs.title'/>
                    </div>
                    <p> {probs.contents} </p>
                </div>
            </article>
    </div>
  )
}
export default FrontArticle;