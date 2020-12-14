module JrHelper
  def json_resources(klass, records, context = nil)
    resources = records.map { |record| klass.new(record, context) }
    data = JSONAPI::ResourceSerializer.new(klass).serialize_to_hash(resources)
    data["links"] = json_links
    data
  end

  def json_links
    links = PagedPaginator.new(1).links_page_params({ record_count: Song.count })
    {
      first: api_songs_url(page: links["first"]),
      next: api_songs_url(page: links["next"]),
      last: api_songs_url(page: links["last"])
    }
  end
end
