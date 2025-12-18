import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";

import { UserPlus, Users, BookOpen, Layers, Calendar, PlusCircle } from "lucide-react";


const TeacherDashboard =()=>{


    return(
        <div className="flex h-screen bg-gray-50">
            <Sidebar  activeNav="Dashboard" />
            <div className="flex-1 p-10 overflow-auto">


            </div>
        </div>
    )
}

export default TeacherDashboard;