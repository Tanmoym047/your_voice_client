import { FaFacebookF, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-6 footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">

            < aside className="space-y-1 px-4">

                <h2 className="font-bold text-xl lg:text-3xl">
                    Your Voice
                </h2>
                <h3 className=" opacity-90 text-lg lg:text-xl">
                    Explore. Explain. Inspire. Connect.
                </h3>
            </aside >
            <nav>
                <div className="grid grid-flow-col gap-6 text-3xl">
                    <FaFacebookF />
                    <FaTwitter />
                    {/* <FaGithub /> */}
                    <FaInstagram />
                </div>
                <p className="text-base mt-2">Copyright © 2025 - All right reserved</p>
            </nav>
        </footer>
    );
};

export default Footer;