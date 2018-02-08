/* eslint-disable */
export default {
  snippets: {
    javascript: "const Platform = require('dataprism-ldk-nodejs');\r\nconst platform = new Platform();\r\n\r\nconst views = platform.getStream(\"views_raw\");\r\n\r\nviews \r\n\t.map(event => {\r\n\t\tmappedEvent = Object.assign({}, event); \r\n\r\n\t\tdelete mappedEvent.ip_address; \r\n\t\tdelete mappedEvent.geo_location; \r\n\r\n\t\treturn mappedEvent; \r\n\t})\r\n\t.reduce(calcRunningAvgDuration)\r\n\t.toStream('average_view_duration'); \r\n\r\nstream.start();\r\n\r\nfunction calcRunningAvgDuration(agg, event) {\r\n\t...\r\n}",
    markdown: '# Normalize VRTNWS Events\r\n\r\n> This logic processes incoming events from VRTNWS, stripping unnecessary data fields and adding relevant metadata\r\n\r\n\r\n## added metadata: \r\n\r\n* article_title, article_subtitle en article_introduction; Deze geven een iets uitgebreider beeld over de tekstuele inhoud van het artikel \r\n* article_categorytags; De categorie\u00EBn die de redacteur aan het artikel toekende\r\n* article_storytags; Geeft weer of het artikel deel uitmaakt van een overkoepelende reeks\r\n* article_publisheddate; Publicatiedatum\r\n* article_id; Het oorspronkelijke unieke identifier van het artikel (ontbreekt in de views datastroom)'
  }
}
