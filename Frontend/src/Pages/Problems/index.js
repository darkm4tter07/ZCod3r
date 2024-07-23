import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar';
import Navbar from '../../Components/Navbar';
import { BASE_URL } from '../../Constants';
import axios from 'axios';
// import {} from 'react-router-dom'; // Unused import

const problemTags = [
  "Array",
  "String",
  "Dynamic Programming",
  "Math",
  "Tree",
  "DFS",
  "BFS",
  "Graph",
  "Backtracking",
  "Greedy",
  "Hash Table",
  "Sorting",
  "Bit Manipulation",
  "Two Pointers",
  "Stack",
  "Heap",
  "Binary Search",
  "Design",
  "Linked List",
  "Recursion",
  "Union Find",
  "Trie",
  "Queue",
  "Divide and Conquer",
  "Sliding Window",
  "Segment Tree",
  "Binary Indexed Tree",
  "Topological Sort",
  "Random",
  "Geometry",
  "Simulation",
];

const Index = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState(problemTags);

  const fetchProblems = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${BASE_URL}/api/problems`, {
        params: {
          difficulty,
          tags: tags.join(','),
          limit: 6,
          skip: 0
        }
      });
      setProblems(response.data.data); 
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblems();
  }, [difficulty, tags]);

  const handleTagSelection = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setAvailableTags(availableTags.filter(tag => tag !== selectedTag));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setAvailableTags([...availableTags, tagToRemove]);
  };

  return (
    <div className='h-screen flex flex-col pt-4 w-full'>
      <div className='w-screen'>
        <Navbar setOpenSidebar={setOpenSidebar} />
      </div>
      <div className='flex h-full'>
        <SideBar openSidebar={openSidebar} />
        <div className="mx-4 p-2 overflow-y-auto flex-1 md:ml-52 flex my-4 flex-col gap-6 mt-24 ">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading problems</div>
          ) : problems ? (
            problems.map((problem, index) => (
              <div key={index} className='border-2 border-black p-2 px-4 bg-white rounded-lg cursor-pointer mr-48 flex items-center justify-between hover:scale-[101%] hover:bg-[#d9ff4e] flex-wrap'>
                <div className='text-wrap font-bold'>{problem.title}</div>
                <div className={`text-sm ${problem.difficulty==="Easy"? "text-green-600":""} ${problem.difficulty==="Medium"? "text-yellow-600":""}
                ${problem.difficulty==="Hard"? "text-red-600":""}`}>{problem.difficulty}</div>
              </div>
            ))
          ):(
            <div>No problem available for this filter</div>
          )}
        </div>
        <div className='fixed right-0 my-24 mx-4 bg-white rounded-lg border-[3px] border-black w-44 z-50 h-[570px] flex-col items-center'>
          <div className='p-2 font-bold text-md'>
            <span className='bg-[#d9d9d9] rounded-md p-1'>FILTER PROBLEMS</span>
          </div>
          <div className='flex-col w-full'>
            <div className='font-semibold px-2 pt-2 uppercase text-sm'><span className='underline'>DIFFICULTY</span></div>
            <select className='m-2 border-2 border-black rounded-md w-36 bg-[#EDF4D3] font-semibold p-1' onChange={(e) => setDifficulty(e.target.value)}>
              <option value=''>Select difficulty</option>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
            </select>
          </div>
          <div className='flex-col w-full'>
            <div className='font-semibold px-2 pt-2 uppercase text-sm'><span className='underline'>TAGS</span></div>
            <div className='flex flex-wrap max-h-52 overflow-auto'>
              {tags.map((tag, index) => (
                <div key={index} className='m-2 bg-[#cbff0e] rounded-md px-1 flex items-center gap-2 border-2 border-black'>
                  <div className='text-sm font-bold'>{tag}</div>
                  <div className='text-xs text-red-500 cursor-pointer font-bold' onClick={() => removeTag(tag)}>X</div>
                </div>
              ))}
            </div>
            <select className='m-2 border-2 border-black rounded-md w-36 bg-[#EDF4D3] font-semibold p-1' onChange={handleTagSelection}>
              <option value=''>Select a tag</option>
              {availableTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
