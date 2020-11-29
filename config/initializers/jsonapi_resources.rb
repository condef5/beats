JSONAPI.configure do |config|
  config.resource_cache = Rails.cache
  # config.default_caching = true

  # Options are :none, :offset, :paged, or a custom paginator name
  config.default_paginator = :paged # default is :none
end
