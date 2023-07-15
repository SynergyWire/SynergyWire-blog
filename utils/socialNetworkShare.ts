interface Props {
  text: string
  slug: string
}

export class SocialNetworkShare {
  text: string
  url: string
  
  constructor ({ text, slug }: Props) {
    this.text = encodeURIComponent(text)
    this.url = `${encodeURIComponent(process.env.BASE_URL as string)}/posts/${encodeURIComponent(slug)}`
  }

  shareWithLinkedin(source: string) {
    return `https://www.linkedin.com/shareArticle/?mini=true&url=${this.url}&title=${this.text}&source=${encodeURIComponent(source)}`
  }

  shareWithTwitter() {
    return `https://twitter.com/intent/tweet?text=${this.text}&url=${this.url}`
  }
}