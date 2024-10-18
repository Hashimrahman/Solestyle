import demo from "../../assets/contact.png";

const ContactUs = () => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Contact SoleStyle</h1>
      <div className="flex m-4 mt-20">
        <div className="w-1/2 hidden md:flex justify-center">
          <img src={demo} alt="" className=" rounded-md h-[28rem]"/>
        </div>
        <div className="w-full md:w-1/2">
          <form action="" className="px-4 flex flex-col gap-8 justify-center items-center">
            <div className="w-4/5">
              <label htmlFor="">Your name</label>
              <br />
              <input
                type="text"
                className="w-full mt-4 p-4 rounded-md border"
                placeholder="Enter your name"
              />
            </div>
            <div className="w-4/5">
              <label htmlFor="">Your Email</label>
              <br />
              <input
                type="text"
                className="w-full mt-4 p-4 rounded-md border"
                placeholder="Enter your Email"
              />
            </div>
            <div className="w-4/5">
              <label htmlFor="">Your Message</label>
              <br />
              <textarea
                type="text"
                className="w-full mt-4 p-4 rounded-md border min-h-32"
                placeholder="Enter your Message"
              />
            </div>
            <button className="bg-blue-500 px-24 py-3 rounded-md hover:bg-blue-800 transform-all ease-in-out duration-1000">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
