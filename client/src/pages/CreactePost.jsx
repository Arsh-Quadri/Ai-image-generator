import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { downloadImage, getRandomPrompt } from "../utils";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const CreactePost = ({ darkMode }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [downloadPhoto, setDownloadPhoto] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        // setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        // setForm({ ...form, photo: data.photo.generated_image });
        // setForm({ ...form, photo: data.photo });
        setForm({ ...form, photo: data.photo.secure_url });
        setDownloadPhoto(data.photo.secure_url);
        //add data to cloudinary and take response url
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl w-[70%] mx-[10vw] sm:mx-auto">
      <div className="">
        <h1
          className={`font-extrabold ${
            darkMode ? "text-white" : "text-[#222328]"
          }`}
        >
          Create
        </h1>
        <p className={`mt-2 ${darkMode ? "text-white" : "text-[#666e75]"} `}>
          Create imaginative and visually stunning images generated through
          DALL-E AI and share them with community
        </p>
      </div>
      <form className="mt-16 max-w-7xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LableName="Your name"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
            darkMode={darkMode}
          />
          <FormField
            LableName="Prompt"
            type="text"
            name="prompt"
            placeholder="A centered explosion of colorful powder on a black background"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            darkMode={darkMode}
          />
          <div
            className={`relative ${
              darkMode
                ? "text-white bg-[#1f1f1f]"
                : "text-[#222328] bg-gray-50 border border-gray-300"
            }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center`}
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-ful h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className={`w-9/12 h-9/12 object-contain opacity-40 ${
                  darkMode && "filter invert grayscale"
                }`}
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-auto sm:w-full px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          <button
            type="button"
            onClick={() => {
              // console.log(downloadPhoto + "download Url");
              downloadImage(Date.now(), downloadPhoto);
            }}
            className="text-white bg-[#666e75] font-medium rounded-md text-sm w-auto sm:w-full px-5 py-2.5 text-center"
          >
            Download
          </button>
        </div>
        <div className="mt-10">
          <p
            className={`mt-2 ${
              darkMode ? "text-gray-400" : "text-[#666e75]"
            } text-[14px] `}
          >
            Once you have created the image you want, you can share it with
            others in cummunity
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-auto sm:w-full px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreactePost;
