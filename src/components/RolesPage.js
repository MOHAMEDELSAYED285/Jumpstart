import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Briefcase, Users, Calendar, Plus, ChevronDown, ChevronUp, Edit2, Eye, Search, Clock } from 'lucide-react';
import { candidateData } from '../data';
import RatingComponent from './RatingComponent';

const RolesPage = () => {
  const navigate = useNavigate();
  const [isRoleExpanded, setIsRoleExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleData, setRoleData] = useState({
    title: "Software Engineer (Front-end focused)",
    location: "London • Hybrid"
  });

  const totalCandidates = candidateData.length;
  const totalRoles = 1;
  const interviewsThisWeek = 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="bg-white border-b border-gray-200">
        <div className="h-16 container mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Roles Dashboard</h1>
          <Button 
            size="lg"
            className="bg-[#6FEEC5] hover:bg-[#5FD4B0] text-black font-medium shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Role
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            icon={<Briefcase className="h-5 w-5" />}
            title="Total Active Roles"
            value={totalRoles}
            subtitle="Currently hiring"
            trend="+1 this month"
            trendUp={true}
          />
          <MetricCard
            icon={<Users className="h-5 w-5" />}
            title="Total Candidates"
            value={totalCandidates}
            subtitle="In pipeline"
            trend="+5 this week"
            trendUp={true}
          />
          <MetricCard
            icon={<Calendar className="h-5 w-5" />}
            title="Interviews This Week"
            value={interviewsThisWeek}
            subtitle="Scheduled interviews"
            trend="2 tomorrow"
          />
        </div>

        {}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-[#6FEEC5] focus:ring-[#6FEEC5] shadow-sm"
              />
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your Roles</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#6FEEC5] bg-opacity-10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#6FEEC5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{roleData.title}</h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-500">{roleData.location}</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted 1 week ago
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {totalCandidates} candidates
                      </span>
                    </div>
                
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRoleExpanded(!isRoleExpanded)}
                  className="mt-1"
                >
                  {isRoleExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>

              {isRoleExpanded && (
                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 border-gray-200 hover:bg-gray-50"
                      >
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 border-gray-200 hover:bg-gray-50"
                      >
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </Button>
                    </div>
                    <Button 
                      onClick={() => navigate('/kanban')}
                      size="lg"
                      className="bg-[#6FEEC5] hover:bg-[#5FD4B0] text-black shadow-sm hover:shadow-md transition-all"
                    >
                      View ATS
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, subtitle, trend, trendUp }) => (
  <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-200">
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-[#6FEEC5] bg-opacity-10 rounded-lg">
          {React.cloneElement(icon, { className: "text-[#6FEEC5]" })}
        </div>
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      {trend && (
        <div className={`text-xs mt-2 ${trendUp ? 'text-green-600' : 'text-gray-600'}`}>
          {trend}
        </div>
      )}
    </div>
  </Card>
);

export default RolesPage;

