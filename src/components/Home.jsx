import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
 
  const [recipieData, setRecipieData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("http://localhost:3002/api/recipies")
      .then((response) => response.json())
      .then((data) => setRecipieData(data));
  }, [setRecipieData]);

  const handleEdit = (reciepe) => {
    navigate(`/add-reciepe/${reciepe._id}`);
  };

  const handleDelete = (reciepe) => {
    fetch(`http://localhost:3002/api/recipe/delete/${reciepe._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.location.reload();
  };

  const renderReciepe = (reciepe) => {
    return (
      <tr className="h-16" key={reciepe._id}>
        <td>
          <div className="flex items-center space-x-7 pl-20">
            <img  className="w-10 h-10 rounded-full" src={"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"} alt="" />
            <div>
              {reciepe.title}
            </div>
          </div>
        </td>
        <td>{reciepe.ingredients}</td>
        <td>{reciepe.instructions}</td>
        <td>
          <div className="w-full justify-center flex">
            <button
              onClick={() => handleEdit(reciepe)}
              className="bg-gray-200 py-1 px-4 border shadow-md rounded-md mr-5"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(reciepe)}
              className="bg-gray-200 py-1 px-4 border shadow-md rounded-md"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const handleAddUser = () => {
    navigate("/add-reciepe");
  };

  return (
    <div className="flex flex-col">
      <table className=" table-auto w-full">
        <tbody>
          <tr className=" text-left bg-gray-200 h-16  text-gray-500">

            <th className="pl-20">Image</th>
            <th>ingredients</th>
            <th>Instructios</th>
            <th></th>
          </tr>
          {recipieData?.map((reciepe) => renderReciepe(reciepe))}
        </tbody>
      </table>
      <div className="flex justify-end mr-12">
        <button
          className="bg-green-500 py-2 px-4 border shadow-md rounded-md mt-5 text-white"
          onClick={handleAddUser}
        >
          Add Reciepe
        </button>
      </div>
    </div>
  );
};

export default Home;
