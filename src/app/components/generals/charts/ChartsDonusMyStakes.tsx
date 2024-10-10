import { useTranslations } from "next-intl";
import { useEffect } from "react";
import * as echarts from "echarts";
interface DataGraphicProps {
  myShare: number;
  tvl: number;
  percentage: number;
}

const ChartsDonusMyStakes = ({ myShare, tvl, percentage }: DataGraphicProps) => {
  const t = useTranslations();
  
  useEffect(() => {
    let myChart = echarts.init(document.getElementById("main"));

    if (myShare && tvl) {
      const option = {
        series: [
          {
            name: "",
            type: "pie",
            color: ["#7A2FF4", "#A9AEB4"],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [{ value: myShare }, { value: tvl - myShare }],
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [myShare, tvl]);

  return (
    <div className="border border-solid border-[#AD98FF] mt-6 text-white p-2 rounded-[20px]">
      <h1 className="text-[18px] text-[#554D77] text-center font-bold">{t("My Stakes")}</h1>
      <div className="shadow-lg rounded-[20px] pb-6">
        <div id="main" style={{ height: "255px", margin: "0 auto" }}></div>

        <div className="bg-[#7a2ff4] rounded-[10px] flex justify-between items-center p-4 mx-4">
          <div className="flex space-x-1">
            <p className="text-[12px] font-bold">{t("My Share")}</p>
            <p className="text-[12px]">{percentage.toFixed(2)}%</p>
          </div>
          <p className="text-[14px] font-bold">${myShare.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ChartsDonusMyStakes;
