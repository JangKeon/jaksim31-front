'use client';

import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";
import moment from 'moment';
import Loading from "./loading";

export default function BarChartCard(props) {
  
  const emotionNames = ["🥰 좋음", "😕 싫음", "😯 놀람", "😬 두려움", "😶 감정없음", "😑 지루함", "🤢 창피함", "😭 슬픔", "🤔 불확실"];
  // 차트에 표시될 감정 개수 배열
  const [emotionCountThis, setEmotionCountThis] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [emotionCountLast, setEmotionCountLast] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // API 요청 데이터
  const value = new Date();
  const [startDateThis, setStartDateThis] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDateThis, setEndDateThis] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));
  const [startDateLast, setStartDateLast] = useState(new Date(startDateThis.getFullYear(), startDateThis.getMonth() - 1, 1));
  const [endDateLast, setEndDateLast] = useState(new Date(startDateThis.getFullYear(), startDateThis.getMonth(), 0));

  // 이번 달 감정 통계 요청 데이터
  let requestData = new Object();
  requestData.startDate = moment(startDateThis).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateThis).format("YYYY-MM-DD");

  // 이번 달 감정 통계 정보 data fetching을 위한 useQuery
  const { data: dataEmotionThis, isSuccessThis } = useEmotionCountQuery(requestData, "THIS_MONTH", props.emotionCountThis);
  
  // 지난 달 감정 통계 요청 데이터
  requestData = new Object();
  requestData.startDate = moment(startDateLast).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateLast).format("YYYY-MM-DD");
  
  // 지난 달 감정 통계 정보 data fetching을 위한 useQuery
  const { data: dataEmotionLast, error, isLoading, isFetching, isError, isSuccessLast } = useEmotionCountQuery(requestData, "LAST_MONTH", props.emotionCountLast);
  
  // 이번 달 emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionThis != undefined) {

      // 응답 데이터에 대해 emotionNames와 매칭되는 emotionCount 값 설정
      dataEmotionThis.emotionStatics.map((pair) => {      
        let idx = emotionNames.indexOf(pair.emotion)
        emotionCountThis[idx] = pair.countEmotion;
        setEmotionCountThis([...emotionCountThis]);
      });
    }
  }, [isSuccessThis, dataEmotionThis]);

  // 지난 달 emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionLast != undefined) {

      // 응답 데이터에 대해 emotionNames와 매칭되는 emotionCount 값 설정
      dataEmotionLast.emotionStatics.map((pair) => {      
        let idx = emotionNames.indexOf(pair.emotion)
        emotionCountLast[idx] = pair.countEmotion;
        setEmotionCountLast([...emotionCountLast]);
      });
    }
  }, [isSuccessLast, dataEmotionLast]);

  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        /* X축 범주 */
        labels: [
          "좋음",
          "싫음",
          "놀람",
          "두려움",
          "감정 없음",
          "지루함",
          "창피함",
          "슬픔",
          "불확실"
        ],
        title: {
          font: {
            fontColor: "#989898",
            family: "font-leeseoyun"
          }
        },
        datasets: [
          {
            label: "지난 달",
            fill: false,
            backgroundColor: "#CBC0FF",
            borderColor: "#CBC0FF",
            data: [emotionCountLast[0], emotionCountLast[1], emotionCountLast[2], emotionCountLast[3], emotionCountLast[4], emotionCountLast[5], emotionCountLast[6], emotionCountLast[7], emotionCountLast[8]],
          },
          {
            label: "이번 달",
            backgroundColor: "#FFC0C0",
            borderColor: "#FFC0C0",
            data: [emotionCountThis[0], emotionCountThis[1], emotionCountThis[2], emotionCountThis[3], emotionCountThis[4], emotionCountThis[5], emotionCountThis[6], emotionCountThis[7], emotionCountThis[8]],
            fill: false
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        title: {
          display: false,
          text: "감정 비교",
        },
        tooltips: {
          mode: "point",
          intersect: false,
        },
        legend: {
          labels: {
            fontColor: "#989898",
            fontFamily: "font-leeseoyun",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                fontFamily: "font-leeseoyun",
                fontSize: 15,
                fontColor: "#989898",
                labelString: "감정 종류",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                fontFamily: "font-leeseoyun",
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    if(window.myBar) {
      window.myBar.destroy();
    }
    window.myBar = new Chart(ctx, config);
  }, [emotionCountThis, emotionCountLast]);
  

  if( isLoading || isFetching ) return (
    <div className="flex justify-center w-full">
        <Loading dataType="이번 달 감정"/>
        <canvas id="bar-chart" hidden ></canvas>
    </div>
  )
    
  if ( isError ) return (
      <div className="flex justify-center">
          <div className="my-16 text-2xl text-center">
              😥<br/>{error.errorMessage}
          </div>
      </div>
  )

  return (
    <>
      <div className="relative flex flex-col w-full h-full min-w-0 mb-6 break-words shadow-lg rounded-xl dark:bg-zinc-700 bg-zinc-100" data-testid="barChartCard">
        <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <div className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
                지난 달과 감정 빈도를 비교해봐요!😊
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <div className="flex items-center h-full">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
