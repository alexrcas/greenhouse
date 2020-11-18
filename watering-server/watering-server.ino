
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;

const int sensorPin = 5;
const int measureInterval = 2500;
volatile int pulseConter;
 
// YF-S201
const float factorK = 7.5;
 
// FS300A
//const float factorK = 5.5;
 
// FS400A
//const float factorK = 3.5;
 
float volume = 0;
long t0 = 0;
bool watering;
 

void ICACHE_RAM_ATTR ISRCountPulse()
{
   pulseConter++;
}
 
float GetFrequency()
{
   pulseConter = 0;
 
   interrupts();
   delay(measureInterval);
   noInterrupts();
 
   return (float)pulseConter * 1000 / measureInterval;
}
 
void SumVolume(float dV)
{
   volume += dV / 60 * (millis() - t0) / 1000.0;
   t0 = millis();
}
 
void setup()
{
   Serial.begin(115200);
   attachInterrupt(digitalPinToInterrupt(sensorPin), ISRCountPulse, RISING);
   t0 = millis();
   watering = false;

    for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("Red Wifi A_2", "Turing0906");
}

void sendHttpRequest(String url) {
  interrupts();
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
    noInterrupts();
}


String buildUrl(String url, float volume) {
  return url + String("volume=") + volume;
}
 
void loop()
{
  String url = "http://192.168.0.104:3000/watering/?";
  float frequency = GetFrequency();

  float flow_Lmin = frequency / factorK;
  SumVolume(flow_Lmin);

  if (flow_Lmin >= 0.25 && !watering) {
    Serial.println("Comienza riego");
    watering = true;
  }

  if (watering) {
    Serial.print(volume, 1);
    Serial.println(" (L)");
    url = buildUrl(url, volume);
    Serial.println(url);
    if ((WiFiMulti.run() == WL_CONNECTED))
      sendHttpRequest(url);
  }

  if (flow_Lmin < 0.25 && watering == true) {
    Serial.println("Riego terminado");
    String finishUrl = "http://192.168.0.104:3000/watering/finish/?";
    finishUrl = buildUrl(finishUrl, volume);
    watering = false;
    if ((WiFiMulti.run() == WL_CONNECTED))
      sendHttpRequest(finishUrl);
    volume = 0;
  }

  
}
