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

const page = () => {
  return (
    <>
      <h1 className="font-honk text-8xl">Gallery</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {mockImages.map((image) => (
          <div
            className=" rounded-lg bg-gradient-to-t from-slate-200 to-slate-500 p-1 pb-5"
            key={image.id}
          >
            <img className="h-auto max-w-full rounded-lg" src={image.url} />
            <div className="mt-2">
              <button className=" mx-2 rounded-lg bg-slate-100 px-2 hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                <p className="font-honk">Buy</p>
              </button>
              <p className="float-end mt-auto text-center">Image {image.id}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default page;