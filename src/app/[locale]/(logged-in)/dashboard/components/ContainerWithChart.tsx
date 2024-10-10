"use client";
import React from "react";
import LinealChart from "@/app/components/generals/charts/ChartLines";

const ContainerChart = () => {
  return (
    <div className="mx-6 bg-white rounded-[16px] h-[280px]">
      <LinealChart />
    </div>
  );
};

export default ContainerChart;
