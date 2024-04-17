"use client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useState } from "react";

const mockUrls = [
  "https://1.bp.blogspot.com/-44RJKI4Ro0U/Xqoit7Aqx9I/AAAAAAAAK9M/TBEwLlTwW6gR54DjNiGmKcPB17lJRwS2QCLcBGAsYHQ/s1600/Animal_4.png",
  "https://i.pinimg.com/originals/81/41/db/8141db7fdbec49d9e54188b8e37bdf6b.jpg",
  "https://www.femalefirst.co.uk/image-library/land/1000/1/10-weird-animals.jpg",
  "https://www.anaedoonline.ng/wp-content/uploads/2020/04/054f2eb4eb2b0a35ab2ab327559194325979641468827699719-1920x1255.jpeg",
  "https://static.tbdcdn.com/uploads/2018/04/12/95007-smallv2-500505.jpg",
  "https://images.squarespace-cdn.com/content/54f74f23e4b0952b4e0011c0/1488778547581-32S74WBTSAM4WN3PTOUU/?format=1000w&content-type=image%2Fjpeg",
];
const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

const Page = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const handleAdopt = async (animalIndex: string) => {
    setLoading(true);
    const response = await axios.post("/api/adopt", {
      animalId: animalIndex,
      heroName: user?.name,
      sourceEmail: user?.email,
    });
    if (response.status === 200) {
      toast.success("Adopted successfully");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <>
      <h1 className="font-honk text-4xl">Adopt a cute animal</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {mockImages.map((image) => (
          <div
            className="flex flex-col justify-between rounded-lg bg-gradient-to-t from-slate-200 to-slate-500 p-1 pb-2"
            key={image.id}
          >
            <img className="h-auto max-w-full rounded-lg" src={image.url} />
            <div className="mt-2">
              <button
                className=" mx-2 rounded-md bg-slate-100 p-2 hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                onClick={() => {
                  handleAdopt(image.id.toString());
                }}
                disabled={loading}
              >
                <p className="text-sm font-semibold text-slate-700">Adopt</p>
              </button>
              <p className="float-end text-sm font-semibold text-slate-700">
                Image {image.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Page;
