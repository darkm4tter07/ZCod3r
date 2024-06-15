import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../Constants';

/*
"data": [
    {
      "_id": "666b2b26f7dbc72878ce45ce",
      "title": "hello",
      "body": "hello word",
      "createdBy": {
        "_id": "6661d3bc608741404615320a",
        "username": "vikasanand.darkmatter",
        "fullName": "Vikas Anand (Dark Matter)",
        "profileUrl": "https://lh3.googleusercontent.com/a/ACg8ocIOcIvy7GNj2OcaZbp6KtHajocJ-EmpJymwoRxTox3J6-ovLR2A=s96-c"
      },
      "imageLinks": [
        "https://res.cloudinary.com/dtrnbzegc/image/upload/v1718299429/eyrujn9awt86hyfz2d4a.png",
        "https://res.cloudinary.com/dtrnbzegc/image/upload/v1718299429/uui9fx33ngsxtwatvykk.png"
      ],
      "likes": [],
      "tags": [
        "hello",
        "world",
        "hello world"
      ],
      "comments": [],
      "createdAt": "2024-06-13T17:23:50.210Z",
      "updatedAt": "2024-06-13T17:23:50.210Z",
      "__v": 0
    }
  ],
*/

const Post = ({post}) => {
  const [current, setCurrent] = useState(0);

  const previousImage = () =>{
    if(current===0){
      setCurrent(post.imageLinks.length-1);
    }else{
      setCurrent(current-1);
    }
  }

  const nextImage = () =>{
    if(current===post.imageLinks.length-1){
      setCurrent(0);
    }else{
      setCurrent(current+1);
    }
  }

  return (
    <div className='flex flex-col bg-white border-2 border-black rounded-lg p-4 max-w-[80%]'>
      {/* Post Header */}
      <div className='flex w-full gap-2'>
        <div className='w-12 h-12 rounded-full border-2 border-black bg-center bg-cover' style={{backgroundImage: `url(${post.createdBy.profileUrl})`}}></div>
        <div className='flex flex-col'>
          <div className='uppercase font-bold'>{post.createdBy.fullName}</div>
          <div className='hover:underline cursor-pointer hover:text-blue-800 text-sm opacity-65'>{post.createdBy.username}</div>
        </div>
        <div className='flex gap-2 h-6 ml-6 flex-wrap'>
          {post.tags.map((tag, ind) => (
            <div key={ind} className='bg-[#efffb4] rounded-md p-1 px-2 text-sm'>{tag}</div>
          ))}
        </div>
      </div>
      <div className='text-2xl font-bold pt-4' title={post.title}>
        {post.title.slice(0, 50)}
      </div>
      <div className='text-lg text-wrap pt-4' title={post.body}>
          {post.body.slice(0, 200)} {post.title.length > 200 ? "..." : ""}
      </div>
      {post.imageLinks.length>0 && (<div className='border-2 border-black rounded-lg min-h-48 mt-4 flex overflow-hidden relative'>
          {post.imageLinks.length==1 ? (
            <img src={post.imageLinks[0]} alt='post' className='w-full h-full object-cover'/>
          ) : (
            <div className={`flex gap-2 transition ease-out duration-100 items-center`} style={{
                transform: `translateX(-${current*100}%)`
            }}>
              {post.imageLinks.map((img, ind) => (
                <img key={ind} src={img} alt='post' className=' h-full object-cover'/>
              ))}
            </div>
          )}
          {post.imageLinks.length>1 && (
            <div className='absolute flex items-center justify-between w-full h-full px-2'>
              <img src="left.png" alt="<" className='hover:invert hover:scale-95 cursor-pointer shadow-2xl shadow-white' onClick={previousImage}/>
              <img src="right.png" alt=">" className='hover:invert hover:scale-95 cursor-pointer shadow-2xl shadow-white' onClick={nextImage}/>
            </div>
          )}
      </div>
    )}
    </div>
  )
}

const PostContainer = () => {
  const [posts, setPosts] = useState([
    {
      "_id": "666b2b26f7dbc72878ce45ce",
      "title": "hello",
      "body": "hello word",
      "createdBy": {
        "_id": "6661d3bc608741404615320a",
        "username": "vikasanand.darkmatter",
        "fullName": "Vikas Anand (Dark Matter)",
        "profileUrl": "https://lh3.googleusercontent.com/a/ACg8ocIOcIvy7GNj2OcaZbp6KtHajocJ-EmpJymwoRxTox3J6-ovLR2A=s96-c"
      },
      "imageLinks": [
        "https://res.cloudinary.com/dtrnbzegc/image/upload/v1718299429/eyrujn9awt86hyfz2d4a.png",
        "https://res.cloudinary.com/dtrnbzegc/image/upload/v1718299429/uui9fx33ngsxtwatvykk.png"
      ],
      "likes": [],
      "tags": [
        "hello",
        "world",
        "hello world"
      ],
      "comments": [],
      "createdAt": "2024-06-13T17:23:50.210Z",
      "updatedAt": "2024-06-13T17:23:50.210Z",
      "__v": 0
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className='m-4 p-2 overflow-y-auto border-2 border-black flex-1 md:ml-52 flex justify-center items-start'>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostContainer