import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Resources: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: t("resources.all") },
    { value: "anxiety", label: t("resources.anxiety") },
    { value: "depression", label: t("resources.depression") },
    { value: "stress", label: t("resources.stress") },
    { value: "relationships", label: t("resources.relationships") },
    { value: "academic", label: t("resources.academic") }
  ];

  const resources = [
    {
      id: 1,
      title: t("resources.resource1.title"),
      description: t("resources.resource1.description"),
      type: "video",
      category: "anxiety",
      duration: "15 min",
      thumbnail: "https://via.placeholder.com/300x200?text=Video+Thumbnail"
    },
    {
      id: 2,
      title: t("resources.resource2.title"),
      description: t("resources.resource2.description"),
      type: "article",
      category: "depression",
      duration: "8 min read",
      thumbnail: "https://via.placeholder.com/300x200?text=Article+Image"
    },
    {
      id: 3,
      title: t("resources.resource3.title"),
      description: t("resources.resource3.description"),
      type: "audio",
      category: "stress",
      duration: "20 min",
      thumbnail: "https://via.placeholder.com/300x200?text=Audio+Thumbnail"
    },
    {
      id: 4,
      title: t("resources.resource4.title"),
      description: t("resources.resource4.description"),
      type: "video",
      category: "relationships",
      duration: "12 min",
      thumbnail: "https://via.placeholder.com/300x200?text=Video+Thumbnail"
    },
    {
      id: 5,
      title: t("resources.resource5.title"),
      description: t("resources.resource5.description"),
      type: "article",
      category: "academic",
      duration: "6 min read",
      thumbnail: "https://via.placeholder.com/300x200?text=Article+Image"
    },
    {
      id: 6,
      title: t("resources.resource6.title"),
      description: t("resources.resource6.description"),
      type: "video",
      category: "anxiety",
      duration: "18 min",
      thumbnail: "https://via.placeholder.com/300x200?text=Video+Thumbnail"
    }
  ];

  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case "article":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case "audio":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{t("resources.title")}</h1>
          <button
            onClick={() => window.history.back()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">{t("resources.filterByCategory")}</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedCategory === category.value
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                        <span>•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    <button className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">{t("resources.noResources")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
