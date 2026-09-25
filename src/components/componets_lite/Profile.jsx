
import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import {
  Mail,
  Phone,
  MapPin,
  Pencil,
  Upload,
  Download,
} from "lucide-react";

import Appliedjobs from "./Appliedjobs";
import EditProfileModel from "./EditProfileModel";

import { useSelector } from "react-redux";

function Profile() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= REDUX USER =================
  const user = useSelector(
    (state) => state.auth?.user
  );

  console.log("PROFILE USER:", user);

  // ================= RESUME UPLOAD =================
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }

    setLoading(true);

    // Temporary frontend upload simulation
    setTimeout(() => {
      setResume(file);
      setLoading(false);

      alert("Resume uploaded successfully!");
    }, 1000);
  };

  // ================= USER DATA =================
  const fullname = user?.fullname || "User";

  const email = user?.email || "No email available";

  const phonenumber =
    user?.phonenumber || "No phone number available";

  const profile = user?.profile || {};

  const bio =
    profile?.bio ||
    "No bio added yet.";

  const profilePhoto =
    profile?.profilePhoto || "";

  const location =
    profile?.location ||
    "Location not available";

  const skills =
    profile?.skills || [];

  const resumeUrl =
    profile?.resume || "";

  const resumeName =
    profile?.resumeOriginalname ||
    profile?.resumeOriginalName ||
    "No resume uploaded";

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto my-8 px-4">

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div className="flex items-center gap-6">

              {/* PROFILE PHOTO */}
              <Avatar className="w-24 h-24">

                {profilePhoto ? (
                  <AvatarImage
                    src={profilePhoto}
                    alt={fullname}
                  />
                ) : null}

                <AvatarFallback>
                  {fullname
                    ?.charAt(0)
                    ?.toUpperCase()}
                </AvatarFallback>

              </Avatar>

              {/* NAME + BIO */}
              <div>

                <h1 className="text-3xl font-bold">
                  {fullname}
                </h1>

                <p className="text-gray-600 mt-2">
                  {bio}
                </p>

              </div>
            </div>

            {/* EDIT PROFILE */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>

          </div>

          {/* ================= CONTACT ================= */}
          <div className="mt-8 space-y-4">

            {/* EMAIL */}
            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-gray-500" />

              <a
                href={`mailto:${email}`}
                className="hover:underline"
              >
                {email}
              </a>

            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3">

              <Phone className="h-5 w-5 text-gray-500" />

              <a
                href={`tel:${phonenumber}`}
                className="hover:underline"
              >
                {phonenumber}
              </a>

            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-3">

              <MapPin className="h-5 w-5 text-gray-500" />

              <span>
                {location}
              </span>

            </div>

          </div>

          {/* ================= SKILLS ================= */}
          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Skills
            </h2>

            {skills.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No skills added yet.
              </p>

            )}

          </div>

          {/* ================= RESUME ================= */}
          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Resume
            </h2>

            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleResumeUpload}
            />

            {/* UPLOAD */}
            <Button
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={loading}
            >

              <Upload className="mr-2 h-4 w-4" />

              {loading
                ? "Uploading..."
                : "Upload Resume"}

            </Button>

            {/* CURRENT RESUME */}
            <div className="mt-5 border rounded-xl p-5 bg-gray-50">

              <h3 className="font-semibold text-green-600">
                Current Resume
              </h3>

              <p className="mt-2">
                {resumeName}
              </p>

              {resumeUrl && resumeUrl !== "#" ? (

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >

                  <Button
                    variant="outline"
                    className="mt-4"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>

                </a>

              ) : (

                <p className="text-gray-500 mt-3">
                  No resume available.
                </p>

              )}

            </div>

            {/* NEWLY UPLOADED RESUME */}
            {resume && (

              <div className="mt-5 border rounded-xl p-5 bg-green-100">

                <h3 className="font-semibold text-green-700">
                  Resume Uploaded Successfully
                </h3>

                <p className="mt-2">
                  {resume.name}
                </p>

              </div>

            )}

          </div>

        </div>

        {/* ================= APPLIED JOBS ================= */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">

          <h2 className="text-xl font-bold mb-4">
            Applied Jobs
          </h2>

          <Appliedjobs />

        </div>

      </div>

      {/* ================= EDIT PROFILE ================= */}
      <EditProfileModel
        open={open}
        setOpen={setOpen}
      />

    </>
  );
}

export default Profile;
