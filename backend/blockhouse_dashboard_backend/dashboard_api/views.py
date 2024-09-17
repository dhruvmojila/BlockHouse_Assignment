from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class CandlestickDataView(APIView):
    def get(self, request):
        data = {
            "data": [
                    {"x": "2023-01-01", "open": 30.00, "high": 40.00, "low": 25.00, "close": 35.00},
                    {"x": "2023-01-02", "open": 35.00, "high": 45.00, "low": 30.00, "close": 40.00},
                    {"x": "2023-01-03", "open": 40.00, "high": 50.00, "low": 35.00, "close": 45.00},
                    {"x": "2023-01-04", "open": 45.00, "high": 48.50, "low": 42.00, "close": 43.50},
                    {"x": "2023-01-05", "open": 43.50, "high": 46.00, "low": 41.00, "close": 44.00},
                    {"x": "2023-01-06", "open": 44.00, "high": 47.00, "low": 43.00, "close": 46.50},
                    {"x": "2023-01-07", "open": 46.50, "high": 49.00, "low": 45.00, "close": 48.00},
                    {"x": "2023-01-08", "open": 48.00, "high": 51.00, "low": 47.00, "close": 50.50},
                    {"x": "2023-01-09", "open": 50.50, "high": 53.00, "low": 49.00, "close": 52.00},
                    {"x": "2023-01-10", "open": 52.00, "high": 54.00, "low": 50.00, "close": 51.50},
                    {"x": "2023-01-11", "open": 51.50, "high": 52.50, "low": 48.00, "close": 49.00},
                    {"x": "2023-01-12", "open": 49.00, "high": 50.00, "low": 46.00, "close": 47.50},
                    {"x": "2023-01-13", "open": 47.50, "high": 49.00, "low": 45.00, "close": 48.00},
                    {"x": "2023-01-14", "open": 48.00, "high": 50.00, "low": 47.00, "close": 49.50},
                    {"x": "2023-01-15", "open": 49.50, "high": 52.00, "low": 48.00, "close": 51.00},
                    {"x": "2023-01-16", "open": 51.00, "high": 53.00, "low": 50.00, "close": 52.50},
                    {"x": "2023-01-17", "open": 52.50, "high": 55.00, "low": 51.00, "close": 54.00},
                    {"x": "2023-01-18", "open": 54.00, "high": 56.00, "low": 52.00, "close": 53.50},
                    {"x": "2023-01-19", "open": 53.50, "high": 54.50, "low": 51.00, "close": 52.00},
                    {"x": "2023-01-20", "open": 52.00, "high": 53.00, "low": 49.00, "close": 50.50},
                    {"x": "2023-01-21", "open": 50.50, "high": 52.00, "low": 48.00, "close": 51.00},
                    {"x": "2023-01-22", "open": 51.00, "high": 53.00, "low": 50.00, "close": 52.50},
                    {"x": "2023-01-23", "open": 52.50, "high": 54.00, "low": 51.00, "close": 53.00},
                    {"x": "2023-01-24", "open": 53.00, "high": 55.00, "low": 52.00, "close": 54.50},
                    {"x": "2023-01-25", "open": 54.50, "high": 57.00, "low": 53.00, "close": 56.00},
                    {"x": "2023-01-26", "open": 56.00, "high": 58.00, "low": 55.00, "close": 57.50},
                    {"x": "2023-01-27", "open": 57.50, "high": 59.00, "low": 56.00, "close": 58.00},
                    {"x": "2023-01-28", "open": 58.00, "high": 60.00, "low": 57.00, "close": 59.50},
                    {"x": "2023-01-29", "open": 59.50, "high": 61.00, "low": 58.00, "close": 60.00},
                    {"x": "2023-01-30", "open": 60.00, "high": 62.00, "low": 59.00, "close": 61.50},
                    {"x": "2023-01-31", "open": 61.50, "high": 63.00, "low": 60.00, "close": 62.00}
            ]
        }
        return Response(data)

class LineChartDataView(APIView):
    def get(self, request):
        data = {
            "labels": [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            "data": [
                42, 55, 49, 68, 72, 80, 
                87, 91, 85, 79, 88, 95
            ]
        }
        return Response(data)

class BarChartDataView(APIView):
    def get(self, request):
        data = {
              "labels": [
            "Product A", "Product B", "Product C", "Product D", "Product E",
            "Product F", "Product G", "Product H", "Product I", "Product J"
        ],
        "data": [
            120, 185, 210, 95, 165, 
            140, 230, 180, 105, 195
        ]
        }
        return Response(data)

class PieChartDataView(APIView):
    def get(self, request):
        data = {
            "labels": [
                "Red", "Blue", "Yellow", "Green", "Purple", 
                "Orange", "Pink", "Teal", "Brown", "Gray"
            ],
            "data": [
                300, 150, 200, 120, 180, 
                90, 110, 70, 50, 130
            ]
        }
        return Response(data)