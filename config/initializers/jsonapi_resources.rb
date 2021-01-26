JSONAPI.configure do |config|
  config.json_key_format = :camelized_key
  config.resource_cache = Rails.cache

  # config.default_caching = true

  # Options are :none, :offset, :paged, or a custom paginator name
  config.default_paginator = :paged # default is :none
end
