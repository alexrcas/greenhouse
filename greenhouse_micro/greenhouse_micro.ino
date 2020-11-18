#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;

struct Measure {
  double temp;
  int hum;
  int terr;
};

Measure measure;


void setup() {
  Serial.begin(115200);

  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("Red Wifi A_2", "Turing0906");

}


void sendHttpRequest(String url) {
    WiFiClient client;
    HTTPClient http;

    if (http.begin(client, url)) {
      int httpCode = http.GET();
      if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();
    }
    else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
}


String buildUrl(String url, Measure& measure) {
  return url + String("temp=") + measure.temp + String("&hum=") + measure.hum + String("&terr=") + measure.terr;
}


void readMeasureFromSensors(Measure& measure) {
  measure.temp = 21.5;
  measure.hum = 60;
  measure.terr = 55;
}


void loop() {
  
  String url = "http://192.168.0.104:3000/?";
  readMeasureFromSensors(measure);

  url = buildUrl(url, measure);

  Serial.println(url);
  
  if ((WiFiMulti.run() == WL_CONNECTED))
    sendHttpRequest(url);

  delay(10000);
}
