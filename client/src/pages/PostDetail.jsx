import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className='post-detail'>
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__buttons">
            <Link to={'posts/werwer/edit'} className='btn sm primary'>Edit</Link>
            <Link to={'posts/werwer/delete'} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, explicabo. Doloribus voluptatum atque non, minima alias explicabo quae sit fuga placeat enim. Blanditiis cum quibusdam natus quae vel praesentium corporis, reiciendis, aliquid sit omnis rem similique eum in odit asperiores.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus commodi dignissimos assumenda animi, quisquam, fugit, ipsum consectetur molestias eligendi mollitia aliquid quae ex vitae perferendis nobis odio placeat. Architecto maiores omnis quisquam aspernatur doloribus dignissimos! Veniam nesciunt sed sequi cumque inventore nobis at voluptatibus repellat ipsa tempora voluptatem quaerat quo, quasi delectus. Magni, natus autem?
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sunt, architecto ullam amet earum perferendis saepe dolor hic nihil ipsam consectetur doloremque maxime reiciendis perspiciatis obcaecati soluta beatae praesentium similique blanditiis numquam fugiat laborum nostrum totam deleniti! Est deleniti quia sint dicta dignissimos culpa magni ipsum assumenda, omnis impedit repellat quibusdam, accusamus molestiae non officia, sit maxime doloribus nobis. Consectetur expedita optio recusandae perferendis quam dignissimos quibusdam necessitatibus minus beatae consequatur nam voluptatibus sapiente a omnis repellendus quae, atque autem quia odio odit aliquid repellat rem. Iure, dicta ex. Minima et repudiandae, ullam amet quibusdam unde eos? Fuga aut, neque saepe impedit provident officiis ipsa?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat qui, temporibus magnam possimus amet nam blanditiis doloremque neque maxime quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolorem quod modi nemo placeat vero repudiandae voluptas tenetur iusto delectus necessitatibus doloribus, suscipit adipisci nulla consequuntur incidunt quidem cumque neque sequi atque! Unde totam perferendis hic veritatis ea delectus harum iste? Harum, architecto iusto aut sed maxime cum velit, aliquid rerum dolor, temporibus voluptatem non eveniet nulla officiis dolore! Tenetur, perferendis aliquam doloremque reprehenderit dignissimos atque perspiciatis tempore optio accusamus modi laudantium autem incidunt sunt minima. Nobis possimus, voluptas blanditiis itaque eum minima ducimus voluptate ut! Quibusdam quos exercitationem distinctio aspernatur quaerat nihil? Possimus fuga officia veniam molestias voluptatum repudiandae quas, corrupti dolor doloremque facilis et quasi soluta, magni vitae. Optio maiores distinctio adipisci natus, mollitia ipsam. Quas doloribus quos eveniet accusamus natus dolores, sapiente quaerat ex a adipisci excepturi, ut aliquid suscipit voluptates quo odio optio repellat illo! Neque ab id commodi impedit sit corrupti, libero minima explicabo accusantium quis debitis voluptates dolor iste rem expedita hic recusandae consequatur inventore eos qui mollitia dolores odio. Voluptatibus earum possimus, molestias voluptatum maiores sit perspiciatis, repellat, autem laudantium distinctio odio delectus eaque enim cumque? Deleniti sapiente nisi neque at eveniet suscipit consectetur. Laudantium quasi officiis velit voluptatum corporis, corrupti suscipit pariatur!
        </p>
      </div>
    </section>
  )
}

export default PostDetail