import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";

const ingredients = ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4", "ingredient 5", "ingredient 6"]


const AddUser = ({ edit }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const [reciepe, setReciepe] = useState({
    image: "",
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      fetch(`http://localhost:3002/api/recipe/${id}`)
        .then((response) => response.json())
        .then((data) => setReciepe(data))
        .catch((err) => console.log(err));
    }
  }, [edit]);

  const handleChange = (e) => {
    setReciepe({ ...reciepe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    if (edit) {
      fetch(`http://localhost:3002/api/recipe/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reciepe),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      navigate("/");
    } else {
      fetch("http://localhost:3002/api/recipe/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reciepe),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
            alert(error.status);
        });

        navigate("/");
    }
  };

  
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
      const imageUrl = URL.createObjectURL(file);
        setReciepe({ ...reciepe, image: imageUrl });
    }
  };



  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        setReciepe({ ...reciepe, ingredients: [...reciepe.ingredients, value] });
    } else {
        setReciepe({ ...reciepe, ingredients: reciepe.ingredients.filter((ingredient) => ingredient !== value) });
    }
  };

  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <div className=" w-4/6 bg-gray-200 h-4/6 border shadow-md rounded-md p-5 flex space-x-6">
        <div className="w-2/6 h-full bg-white rounded-md flex justify-center items-center">
          <div>
            <div
                className=" w-40 h-40 border bg-gray-100 rounded-full cursor-pointer flex justify-center items-center text-center text-xs"
                onClick={handleImageClick}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                "upload image"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="w-4/6 h-full bg-white rounded-md">
          <form className="flex w-full h-full flex-col">
            <div className="flex px-5 py-8 space-x-7 w-full h-5/6">
              <div className="w-1/2 h-full flex flex-col justify-around">
                <input
                  className="border py-3 px-5 w-full rounded-md bg-gray-100"
                  type="text"
                  name="title"
                  value={reciepe.title}
                  onChange={handleChange}
                  placeholder="Enter Title"
                />
                <textarea
                  className="border py-3 px-5 w-full rounded-md bg-gray-100"
                  type="text"
                  name="description"
                  value={reciepe.description}
                  onChange={handleChange}
                  placeholder="Enter discription"
                  rows={5}
                />
                <textarea
                  className="border py-3 px-5 w-full rounded-md bg-gray-100"
                  type="text"
                  name="instructions"
                  value={reciepe.instructions}
                  onChange={handleChange}
                  placeholder="Enter Instructions"
                  role={4}
                />
                
                
              </div>
              <div className="w-1/2 h-full flex flex-col justify-start">
                <div>
                    <h1 className=" font-bold mb-6">Select Ingredient</h1>
                    {/* {console.log(reciepe.ingredients)} */}
                    {ingredients.map((ingredient) => {
                        return (
                            <label className="flex items-center mb-2">
                                <input
                                type="checkbox"
                                value={ingredient}
                                checked={reciepe.ingredients.includes(ingredient)}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                                <span className="ml-2 text-gray-700">{ingredient}</span>
                            </label>
                        )
                    })}
                
                </div>
              </div>
            </div>
            <div className="w-full h-1/6 flex justify-end p-5">
              <button
                className="bg-green-500 text-white px-5 rounded-md shadow-md"
                onClick={handleSubmit}
              >
                {edit ? "Update Reciepe" : "Add Reciepe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
