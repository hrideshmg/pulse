# Speech-to-Text pricing

Contact sales [Contact sales](https://cloud.google.com/contact)

Go to console [Go to console](https://console.cloud.google.com/speech/transcriptions)

Speech-to-Text is priced based on the amount of audio successfully processed by the service **each month**, measured in increments of one second. If the API returns a response, the audio sent in the request was successfully processed. This includes an empty response, which indicates that the API processed the audio but could not transcribe it. Requests that result in an server error do not count as successfully processed and therefore don't incur any cost.

You can view your current billing status, including usage and your current bill, in the [Google Cloud console](https://console.cloud.google.com/billing). For more details about managing your account, see the [Cloud Billing documentation](https://cloud.google.com/billing/docs) or [Cloud Billing support](https://cloud.google.com/support/billing).

## Speech-to-Text V2 API

The prices in the table below apply to minutes of audio processed per month for the Speech-to-Text v2 API.

### Standard recognition models

| **Category** | Model | Price (USD) |
| Recognition<br>(sku:3099-B70F-0949) | Standard | 0 minute to 500,000 minute<br>$0.016 / 1 minute, per 1 month / account<br>500,000 minute to 1,000,000 minute<br>$0.01 / 1 minute, per 1 month / account<br>1,000,000 minute to 2,000,000 minute<br>$0.008 / 1 minute, per 1 month / account<br>2,000,000 minute and above<br>$0.004 / 1 minute, per 1 month / account |

### Standard dynamic batch recognition

| Category | Model | Per minute |
| Dynamic Batch Recognition<br>(sku:7700-6778-EF8E) | Standard¹ | $0.003 / 1 minute, per 1 month / account |

- Standard¹ models include: default, command\_and\_search, latest\_short, latest\_long, phone\_call, video, chirp (Speech-to-Text V2 only)
- Medical² models include: medical\_conversation, medical\_dictation
- Each request is rounded up to the nearest increment of 1 seconds

## Speech-to-Text V1 API

The prices in the table below apply to minutes of audio processed per month for the Speech-to-Text v1 API.

| **Category** | Model | Price (USD) |
| Speech Recognition (with data logging)<br>sku:67F5-A183-E319 | Standard¹ | 0 minute to 60 minute<br>$0.00 (Free) / 1 minute, per 1 month / account<br>60 minute and above<br>$0.016 / 1 minute, per 1 month / account |
| Speech Recognition (without data logging)<br>sku:60AE-2FE3-C3D8 | Standard¹ | 0 minute to 60 minute<br>$0.00 (Free) / 1 minute, per 1 month / account<br>60 minute and above<br>$0.024 / 1 minute, per 1 month / account |

- Standard¹ models include: default, command\_and\_search, latest\_short, latest\_long, phone\_call, video, chirp (Speech-to-Text V2 only)
- Each request is rounded up to the nearest increment of 1 seconds

### Medical models

| Category | Model | Price (USD) |
| Medical Dictation<br>(sku:6649-62EF-CB8F) | Medical² | 0 minute to 60 minute<br>$0.00 (Free) / 1 minute, per 1 month / account<br>60 minute and above<br>$0.078 / 1 minute, per 1 month / account |
| Medical Conversation<br>(sku:7247-19E1-FB4D) | Medical² | 0 minute to 60 minute<br>$0.00 (Free) / 1 minute, per 1 month / account<br>60 minute and above<br>$0.078 / 1 minute, per 1 month / account |

- Medical² models include: medical\_conversation, medical\_dictation

### Pricing factors

Speech-to-Text pricing is determined by the following factors:

- The [number of channels](https://cloud.google.com/speech-to-text/docs/multi-channel) in the audio being recognized
- The length and amount of audio you send
- The recognition model you are using
- The batch method you are using
- The API version you are using

_Multiple channels_

Each audio channel is billed separately. If you send requests with [multiple channels](https://cloud.google.com/speech-to-text/docs/multi-channel), you will be billed according to the sum total length of audio processed from all channels. This time accounting is different from how monthly usage limits are tracked. Usage limits don't take multiple channels into account and are determined only by the length of the audio file. For example, if you send a request with 30 seconds of audio and 4 channels, you will be billed for 120 seconds but only 30 seconds will count against your monthly quota. See the [quotas and limits](https://cloud.google.com/speech-to-text/quotas) page for more details.

_Dynamic batch_

The Speech-to-Text V2 API has an option to use dynamic batch. Dynamic batch processes audio at a lower level of urgency. If you enable dynamic batch, you will be billed at a discounted rate.

_Large workloads_

For customers with very large workloads, additional volume discounts may be available. Please [contact sales](https://cloud.google.com/contact) to learn more.

### Google Cloud pricing

If you store audio files to be recognized in Google Cloud Storage, or use other Google Cloud resources in tandem with Speech-to-Text, such as Google App Engine instances, then you will also be billed for the use of those services. See [Google Cloud's pricing calculator](https://cloud.google.com/products/calculator) to determine other costs based on current rates.

### What's next

- Read the [Speech-to-Text documentation](https://cloud.google.com/speech-to-text/docs)
- Get started with [Speech-to-Text](https://cloud.google.com/speech-to-text/docs/quickstart)
- Try the [pricing calculator](https://cloud.google.com/products/calculator)
- Learn about [Speech-to-Text solutions and use cases](https://cloud.google.com/architecture?text=Speech-to-Text)

## \#\#\#\# Request a custom quote

With Google Cloud's pay-as-you-go pricing, you only pay for the services you use. Connect with our sales team to get a custom quote for your organization.

Contact sales [Contact sales](https://cloud.google.com/contact?direct=true)

Go to console [Go to console](https://console.google.com/speech)

![Cloud logo](https://www.gstatic.com/cgc/renaissance/image/MultiPath_Bottom_2X_Centered_static.png)