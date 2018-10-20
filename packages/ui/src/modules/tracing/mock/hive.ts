import { IEventsQueryResponse, SpanType, SpanDirection, SpanKind } from '~/modules/tracing/graphql/queries/events';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/logic';

export interface IHiveResponseMock {
  data: IEventsQueryResponse
}

export const hiveResponseMock: IHiveResponseMock = {
  data: {
    events: [
      {
        id: '0',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT',
            spanId: 'DEFAULT.SOIKB',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:xForwardedHost "hagen.plimba.test-fmc-leal.nubank.com.br", :xForwardedProto "http", :xOriginalUri "/api/customers/962b63d3-853c-41bd-89c4-be89e0d44a2d/proposals", :xScheme "http", :host "hagen.plimba.test-fmc-leal.nubank.com.br", :xRequestId "fef71822bb247d1b150fabb6cac2b2e2", :userAgent "curl/7.47.0", :xForwardedFor "10.129.219.101", :origin "", :xRealIp "10.129.219.101", :connection "close", :xForwardedPort "80", :accept "*/*"}}',
          timestamp: '2018-10-09T23:02:16.190',
          tags: {
            type: SpanType.httpIn,
            direction: SpanDirection.consumer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.GET,
              statusCode: null,
              url: '/api/customers/:id/proposals'
            },
            peer: {
              port: 80,
              service: 'hagen.plimba.test-fmc-leal.nubank.com.br'
            }
          }
        }
      },
      {
        id: '1',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.SFQYP',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:contentType "application/json; charset=utf-8", :acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A35241e2cbf6f2cec%3A5f2bf44e4ac9055d%3A1"}, :payload {:grantType "client_credentials", :clientId "trusted.hagen.MISSING", :clientSecret "AO7vJpMndWPgl-c6EK8tkZgttm-RpZe_cCC3FJhVKWVw3IOBGsFCHkwC5PjiMWvEVW13BzPL7Hee9WiV57TumTVZC8mgRXEfBV4NmQy-EWP5aOSThKcWPdCD24tISp8CmZvGJ2Fb9opint2JNs6rGkNIIkgQcEJ9V74CqSIxCdt_mzE-Ug"}}',
          timestamp: '2018-10-09T23:02:17.777',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.producer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.POST,
              statusCode: null,
              url: 'http://auth:8080/api/token'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      },
      {
        id: '2',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.SFQYP',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:contentType "application/json; charset=utf-8", :acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A35241e2cbf6f2cec%3A5f2bf44e4ac9055d%3A1", :xCorrelationId "DEFAULT.SOIKB.SFQYP", :xOriginalIp "192.168.163.2"}, :payload "{\\"grant_type\\":\\"client_credentials\\",\\"client_id\\":\\"trusted.hagen.MISSING\\",\\"client_secret\\":\\"AO7vJpMndWPgl-c6EK8tkZgttm-RpZe_cCC3FJhVKWVw3IOBGsFCHkwC5PjiMWvEVW13BzPL7Hee9WiV57TumTVZC8mgRXEfBV4NmQy-EWP5aOSThKcWPdCD24tISp8CmZvGJ2Fb9opint2JNs6rGkNIIkgQcEJ9V74CqSIxCdt_mzE-Ug\\"}"}',
          timestamp: '2018-10-09T23:02:27.308',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.consumer,
            kind: SpanKind.end,
            http: {
              method: HTTPVerb.POST,
              statusCode: 200,
              url: 'http://auth:8080/api/token'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      },
      {
        id: '3',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.QLNSZ',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A5f2bf44e4ac9055d%3A7afa8a19d65ac33f%3A1"}}',
          timestamp: '2018-10-09T23:02:28.231',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.producer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.GET,
              statusCode: null,
              url: 'zk://consigliere/api/credit-parameters/customer/962b63d3-853c-41bd-89c4-be89e0d44a2d'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      },
      {
        id: '4',
        identity: 'consigliere',
        meta: {
          type: 'newEvent',
          service: 'consigliere',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB.QLNSZ',
            spanId: 'DEFAULT.SOIKB.QLNSZ.2FUHR',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:xB3Spanid "2adbc70e5aa6230d", :acceptEncoding "gzip, deflate", :finagleCtxCom.twitter.finagle.retries "0", :authorization "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMTUtMTEtMjVUMTU6NTI6MjIuMTU1LUxkRjlMbzF5eEdBQUFBRlJQMWg3alEifQ.eyJhdWQiOiJ0cnVzdGVkLmhhZ2VuLk1JU1NJTkciLCJzdWIiOm51bGwsImlzcyI6Imh0dHBzOlwvXC93d3cubnViYW5rLmNvbS5iciIsImV4cCI6MTUzOTIxMjU0MCwic2NvcGUiOiJhdXRoXC90cnVzdGVkIGhhZ2VuIiwianRpIjoiUENhdko5MDlwS2NBQUFGbVd4RWZLQSIsIm10bHMiOmZhbHNlLCJhY2wiOm51bGwsInZlcnNpb24iOiIyIiwiaWF0IjoxNTM5MTI2MTQwfQ.njh5XRWftxrEbjQifNehm29l1LxTtZhBQzd1ShmZmX_ZfitAZbpk6TuCZP6_llI2L7jB6YLGFVK23jwz4tjGfsLWPqLKwvbqYMozptvr3i-fwNl6BNhjSxrYnV133vq2ebULzRuiu9P6Qd9j1msjxfO3sjRMYUDuopbsEUPDTjUsivyHViA8CIIqsXTn0QjLS6ZWlb43-ZLhWXRDDVknYPnlIaHo3O_594EHyaYDfXmIZYwW_OoAeyVDJPLBGO1sZFYpBtRhVA1Xr1IDe6nJUZlyf2VXdz5FMvd-GZYWhoZojZu-tkcoMTTSC4fAmixpgKWt2RuSmc1TN89t5WItkA", :xCorrelationId "DEFAULT.SOIKB.QLNSZ", :xB3Traceid "2adbc70e5aa6230d", :host "consigliere", :userAgent "Nubank/hagen", :origin "", :finagleCtxCom.twitter.finagle.deadline "1539126148704000000 1539126178704000000", :xOriginalIp "192.168.163.2", :uberTraceId "7afa8a19d65ac33f%3A5f2bf44e4ac9055d%3A7afa8a19d65ac33f%3A1"}}',
          timestamp: '2018-10-09T23:02:29.791',
          tags: {
            type: SpanType.httpIn,
            direction: SpanDirection.consumer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.GET,
              statusCode: null,
              url: '/api/credit-parameters/customer/:id'
            },
            peer: {
              port: 80,
              service: 'consigliere'
            }
          }
        }
      },
      {
        id: '5',
        identity: 'consigliere',
        meta: {
          type: 'newEvent',
          service: 'consigliere',
          timestamp: null,
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB.QLNSZ',
            spanId: 'DEFAULT.SOIKB.QLNSZ.2FUHR',
            traceId: 'DEFAULT'
          },
          data: '{:payload {:ownerId "default", :hierarchicalId "5bbd32f8-7ddc-4217-b3ab-90a2478c4a3d", :revolving {:monthlyRate "0.14"}, :billFinancing {:rates [{:installments 3, :monthlyRate "0.0975"} {:installments 10, :monthlyRate "0.0975"} {:installments 2, :monthlyRate "0.0975"} {:installments 1, :monthlyRate "0.0975"} {:installments 11, :monthlyRate "0.0975"} {:installments 8, :monthlyRate "0.0975"} {:installments 12, :monthlyRate "0.0975"} {:installments 5, :monthlyRate "0.0975"} {:installments 4, :monthlyRate "0.0975"} {:installments 7, :monthlyRate "0.0975"} {:installments 9, :monthlyRate "0.0975"} {:installments 6, :monthlyRate "0.0975"}]}, :lending {:personalLoan {:minPrincipal "30.0", :maxPrincipal "0.0", :defaultInstallments 12, :minGraceDays 1, :maxGraceDays 90, :rates [{:installments 6, :monthlyRate "0.055"} {:installments 3, :monthlyRate "0.055"} {:installments 11, :monthlyRate "0.055"} {:installments 10, :monthlyRate "0.055"} {:installments 1, :monthlyRate "0.055"} {:installments 9, :monthlyRate "0.055"} {:installments 18, :monthlyRate "0.055"} {:installments 24, :monthlyRate "0.055"} {:installments 15, :monthlyRate "0.055"} {:installments 13, :monthlyRate "0.055"} {:installments 20, :monthlyRate "0.055"} {:installments 22, :monthlyRate "0.055"} {:installments 17, :monthlyRate "0.055"} {:installments 21, :monthlyRate "0.055"} {:installments 5, :monthlyRate "0.055"} {:installments 12, :monthlyRate "0.055"} {:installments 4, :monthlyRate "0.055"} {:installments 14, :monthlyRate "0.055"} {:installments 16, :monthlyRate "0.055"} {:installments 2, :monthlyRate "0.055"} {:installments 7, :monthlyRate "0.055"} {:installments 8, :monthlyRate "0.055"} {:installments 19, :monthlyRate "0.055"} {:installments 23, :monthlyRate "0.055"}]}}}}',
          timestamp: '2018-10-09T23:02:30.142',
          tags: {
            type: SpanType.httpIn,
            direction: SpanDirection.producer,
            kind: SpanKind.end,
            http: {
              method: HTTPVerb.GET,
              statusCode: 200,
              url: '/api/credit-parameters/customer/:id'
            },
            peer: {
              port: 80,
              service: 'consigliere'
            }
          }
        }
      },
      {
        id: '8',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.QLNSZ',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A5f2bf44e4ac9055d%3A7afa8a19d65ac33f%3A1", :xCorrelationId "DEFAULT.SOIKB.QLNSZ", :xOriginalIp "192.168.163.2"}, :payload nil}',
          timestamp: '2018-10-09T23:02:30.197',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.consumer,
            kind: SpanKind.end,
            http: {
              method: HTTPVerb.GET,
              statusCode: 200,
              url: 'zk://consigliere/api/credit-parameters/customer/962b63d3-853c-41bd-89c4-be89e0d44a2d'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      },
      {
        id: '9',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.MVQVN',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A2e566c5266ea05f9%3A35241e2cbf6f2cec%3A1"}}',
          timestamp: '2018-10-09T23:02:30.280',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.producer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.GET,
              statusCode: null,
              url: 'zk://corleone/api/customers/962b63d3-853c-41bd-89c4-be89e0d44a2d/loans'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      },
      {
        id: '10',
        identity: 'corleone',
        meta: {
          type: 'newEvent',
          service: 'corleone',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB.MVQVN',
            spanId: 'DEFAULT.SOIKB.MVQVN.CVYYI',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:xB3Spanid "6e20aa60044b6b53", :acceptEncoding "gzip, deflate", :finagleCtxCom.twitter.finagle.retries "0", :authorization "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMTUtMTEtMjVUMTU6NTI6MjIuMTU1LUxkRjlMbzF5eEdBQUFBRlJQMWg3alEifQ.eyJhdWQiOiJ0cnVzdGVkLmhhZ2VuLk1JU1NJTkciLCJzdWIiOm51bGwsImlzcyI6Imh0dHBzOlwvXC93d3cubnViYW5rLmNvbS5iciIsImV4cCI6MTUzOTIxMjU0MCwic2NvcGUiOiJhdXRoXC90cnVzdGVkIGhhZ2VuIiwianRpIjoiUENhdko5MDlwS2NBQUFGbVd4RWZLQSIsIm10bHMiOmZhbHNlLCJhY2wiOm51bGwsInZlcnNpb24iOiIyIiwiaWF0IjoxNTM5MTI2MTQwfQ.njh5XRWftxrEbjQifNehm29l1LxTtZhBQzd1ShmZmX_ZfitAZbpk6TuCZP6_llI2L7jB6YLGFVK23jwz4tjGfsLWPqLKwvbqYMozptvr3i-fwNl6BNhjSxrYnV133vq2ebULzRuiu9P6Qd9j1msjxfO3sjRMYUDuopbsEUPDTjUsivyHViA8CIIqsXTn0QjLS6ZWlb43-ZLhWXRDDVknYPnlIaHo3O_594EHyaYDfXmIZYwW_OoAeyVDJPLBGO1sZFYpBtRhVA1Xr1IDe6nJUZlyf2VXdz5FMvd-GZYWhoZojZu-tkcoMTTSC4fAmixpgKWt2RuSmc1TN89t5WItkA", :xCorrelationId "DEFAULT.SOIKB.MVQVN", :xB3Traceid "6e20aa60044b6b53", :host "corleone", :userAgent "Nubank/hagen", :origin "", :finagleCtxCom.twitter.finagle.deadline "1539126150322000000 1539126180322000000", :xOriginalIp "192.168.163.2", :uberTraceId "7afa8a19d65ac33f%3A2e566c5266ea05f9%3A35241e2cbf6f2cec%3A1"}}',
          timestamp: '2018-10-09T23:02:31.566',
          tags: {
            type: SpanType.httpIn,
            direction: SpanDirection.consumer,
            kind: SpanKind.start,
            http: {
              method: HTTPVerb.GET,
              statusCode: null,
              url: '/api/customers/:id/loans'
            },
            peer: {
              port: 80,
              service: 'corleone'
            }
          }
        }
      },
      {
        id: '11',
        identity: 'corleone',
        meta: {
          type: 'newEvent',
          service: 'corleone',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB.MVQVN',
            spanId: 'DEFAULT.SOIKB.MVQVN.CVYYI',
            traceId: 'DEFAULT'
          },
          data: '{:payload {:loans []}}',
          timestamp: '2018-10-09T23:02:32.483',
          tags: {
            type: SpanType.httpIn,
            direction: SpanDirection.producer,
            kind: SpanKind.end,
            http: {
              method: HTTPVerb.GET,
              statusCode: 200,
              url: '/api/customers/:id/loans'
            },
            peer: {
              port: 80,
              service: 'corleone'
            }
          }
        }
      },
      {
        id: '12',
        identity: 'hagen',
        meta: {
          type: 'newEvent',
          service: 'hagen',
          timestamp: null
        },
        payload: {
          context: {
            parentId: 'DEFAULT.SOIKB',
            spanId: 'DEFAULT.SOIKB.MVQVN',
            traceId: 'DEFAULT'
          },
          data: '{:headers {:acceptEncoding "gzip, deflate", :uberTraceId "7afa8a19d65ac33f%3A2e566c5266ea05f9%3A35241e2cbf6f2cec%3A1", :xCorrelationId "DEFAULT.SOIKB.MVQVN", :xOriginalIp "192.168.163.2"}, :payload nil}',
          timestamp: '2018-10-09T23:02:32.553',
          tags: {
            type: SpanType.httpOut,
            direction: SpanDirection.consumer,
            kind: SpanKind.end,
            http: {
              method: HTTPVerb.GET,
              statusCode: 200,
              url: 'zk://corleone/api/customers/962b63d3-853c-41bd-89c4-be89e0d44a2d/loans'
            },
            peer: {
              port: 80,
              service: null
            }
          }
        }
      }
    ]
  }
}
