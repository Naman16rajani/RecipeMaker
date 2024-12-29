import { ChangeEvent, useRef } from "react";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (base64: string) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to convert file to Base64
  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Optional: Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds the 5MB limit.");
      return;
    }

    try {
      const base64String = await convertFileToBase64(file);
      onImageUpload(base64String.split(",")[1]); // Pass Base64 without the prefix
    } catch (error) {
      console.error("Error converting file to Base64:", error);
      alert("Failed to upload the image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Button to trigger file input */}
      <button
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
      >
        <Upload size={20} />
        Upload Image
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};
