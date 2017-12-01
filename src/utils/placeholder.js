/* eslint-disable */
export default {
  snippets: {
    javascript: '\"use strict\";\r\n\r\nconst {KafkaStreams} = require(\".\/..\/index.js\");\r\nconst {nativeConfig: config} = require(\".\/..\/test\/test-config.js\");\r\n\r\nconst kafkaStreams = new KafkaStreams(config);\r\nconst stream = kafkaStreams.getKStream(\"my-input-topic\");\r\n\r\n\/\/adding a side effect call to the stream via tap\r\nstream.forEach(message => {\r\n    console.log(message);\r\n});\r\n\r\n\/\/start the stream\r\n\/\/(wait for the kafka consumer to be ready)\r\nstream.start().then(_ => {\r\n    \/\/wait a few ms and close all connections\r\n    setTimeout(kafkaStreams.closeAll.bind(kafkaStreams), 100);\r\n});',
    markdown: '# Normalize VRTNWS Events\r\n\r\n> This logic processes incoming events from VRTNWS, stripping unnecessary data fields and adding relevant metadata\r\n\r\n\r\n## added metadata: \r\n\r\n* article_title, article_subtitle en article_introduction; Deze geven een iets uitgebreider beeld over de tekstuele inhoud van het artikel \r\n* article_categorytags; De categorie\u00EBn die de redacteur aan het artikel toekende\r\n* article_storytags; Geeft weer of het artikel deel uitmaakt van een overkoepelende reeks\r\n* article_publisheddate; Publicatiedatum\r\n* article_id; Het oorspronkelijke unieke identifier van het artikel (ontbreekt in de views datastroom)'
  }
}
