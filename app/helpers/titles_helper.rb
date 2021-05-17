module TitlesHelper
  HEADER_CLASSES = {
    h1: 'text-2xl mb-6'
  }.freeze

  def headers
    @headers ||= OpenStruct.new(HEADER_CLASSES)
  end
end
