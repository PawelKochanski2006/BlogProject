import React from "react";

const ArticleCard = ({ article }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row">
            <img src={article.image} alt={article.alt} className="w-full md:w-1/3 rounded-lg" />
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <div className="text-sm text-gray-500 mb-2">Terra Living • {article.date} • {article.readTime}</div>
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>{article.views} views • {article.comments} comments</div>
                    <div className="flex items-center space-x-2">
                        <i className="far fa-heart"></i>
                        <span>{article.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
