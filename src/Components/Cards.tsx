// src/Components/Cards.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  client?: string;
  technologies_list?: string[];
  is_featured?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  media_type,
  media_url,
  thumbnail_url,
  client,
  technologies_list = [],
  is_featured = false,
}) => {
  return (
    <Link
      to={`/projects/${id}`}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
    >
      <div className="relative h-48 bg-gray-700">
        {media_type === 'video' ? (
          <>
            {thumbnail_url ? (
              <img
                src={thumbnail_url}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video className="w-full h-full object-cover" muted>
                <source src={media_url} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <img
            src={media_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {is_featured && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        {client && (
          <p className="text-sm text-purple-400 mb-2">Client: {client}</p>
        )}
        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
        {technologies_list.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies_list.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;