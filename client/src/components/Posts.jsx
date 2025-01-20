import React, { useState } from 'react'
import PostItem from './PostItem'
import Thumbnail1 from '../images/blog1.jpg'
import Thumbnail2 from '../images/blog2.jpg'
import Thumbnail3 from '../images/blog3.jpg'
import Thumbnail4 from '../images/blog4.jpg'


const DUMMY_POSTS=[
    {
        id: '1',
        thumbnail: Thumbnail1,
        category: 'education',
        title: 'This is the title of the very first post on this blog',
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error minima nisi assumenda voluptas illum qui veniam pariatur quaerat, dignissimos non. Provident error architecto neque ipsa? Natus itaque iusto, nam rem fugiat fugit soluta, perspiciatis amet aliquid laborum unde. Commodi nam necessitatibus aut ratione quasi repellat eligendi a optio hic, libero incidunt illum asperiores earum corrupti eos eius modi officiis. Cum, autem sit! Rerum magnam atque ipsa aut, pariatur labore recusandae accusamus, vitae a neque nostrum eaque quas autem odio optio incidunt sit. Illum voluptatem omnis ab aliquid quos ratione voluptatum, minus facere alias rem dolore, mollitia, quidem reiciendis velit fugit?",
        authroID: 3
    },
    {
        id: '2',
        thumbnail: Thumbnail2,
        category: 'science',
        title: 'This is the title of the very second post on this blog',
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error minima nisi assumenda voluptas illum qui veniam pariatur quaerat, dignissimos non. Provident error architecto neque ipsa? Natus itaque iusto, nam rem fugiat fugit soluta, perspiciatis amet aliquid laborum unde. Commodi nam necessitatibus aut ratione quasi repellat eligendi a optio hic, libero incidunt illum asperiores earum corrupti eos eius modi officiis. Cum, autem sit! Rerum magnam atque ipsa aut, pariatur labore recusandae accusamus, vitae a neque nostrum eaque quas autem odio optio incidunt sit. Illum voluptatem omnis ab aliquid quos ratione voluptatum, minus facere alias rem dolore, mollitia, quidem reiciendis velit fugit?",
        authroID: 1
    },
    {
        id: '3',
        thumbnail: Thumbnail3,
        category: 'weather',
        title: 'This is the title of the very third post on this blog',
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error minima nisi assumenda voluptas illum qui veniam pariatur quaerat, dignissimos non. Provident error architecto neque ipsa? Natus itaque iusto, nam rem fugiat fugit soluta, perspiciatis amet aliquid laborum unde. Commodi nam necessitatibus aut ratione quasi repellat eligendi a optio hic, libero incidunt illum asperiores earum corrupti eos eius modi officiis. Cum, autem sit! Rerum magnam atque ipsa aut, pariatur labore recusandae accusamus, vitae a neque nostrum eaque quas autem odio optio incidunt sit. Illum voluptatem omnis ab aliquid quos ratione voluptatum, minus facere alias rem dolore, mollitia, quidem reiciendis velit fugit?",
        authroID: 13
    },
    {
        id: '4',
        thumbnail: Thumbnail4,
        category: 'farming',
        title: 'This is the title of the very fourth post on this blog',
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error minima nisi assumenda voluptas illum qui veniam pariatur quaerat, dignissimos non. Provident error architecto neque ipsa? Natus itaque iusto, nam rem fugiat fugit soluta, perspiciatis amet aliquid laborum unde. Commodi nam necessitatibus aut ratione quasi repellat eligendi a optio hic, libero incidunt illum asperiores earum corrupti eos eius modi officiis. Cum, autem sit! Rerum magnam atque ipsa aut, pariatur labore recusandae accusamus, vitae a neque nostrum eaque quas autem odio optio incidunt sit. Illum voluptatem omnis ab aliquid quos ratione voluptatum, minus facere alias rem dolore, mollitia, quidem reiciendis velit fugit?",
        authroID: 11
    }
]

const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS)
  return (
    <section className="posts">
        <div className="container posts__container">
            {
                posts.map(({id, thumbnail, category, title, desc, authorID}) => 
                <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={desc}
                authorID = {authorID} />)
            }
        </div>
    </section>
  )
}

export default Posts