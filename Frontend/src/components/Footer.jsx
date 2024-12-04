import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2023 TerraLiving. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link className="hover:underline">Privacy Policy</Link>
                    <Link className="hover:underline">Terms of Service</Link>
                    <Link className="hover:underline">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
