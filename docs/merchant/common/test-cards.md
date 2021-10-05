# Test cards

This table contains a list of test PANs to use when testing our API.

| PAN                | Type of test                                                          | Message version |
|--------------------|-----------------------------------------------------------------------|-----------------|
| `4111111111111111` | Manual Challenge Authentication with 3DS Method.                      | 2.2.0 or 2.1.0  |
| `9000100911111111` | Challenge Authentication with 3DS Method (with auto-submit).          | 2.1.0           |
| `9001100911111111` | Challenge Authentication with 3DS Method (with auto-submit).          | 2.2.0           |
| `9000101111111111` | Challenge Authentication without 3DS Method (with auto-submit).       | 2.1.0           |
| `9001101111111111` | Challenge Authentication without 3DS Method (with auto-submit).       | 2.2.0           |
| `9000101011111111` | Fail authentication with 3DS Method and Challenge. (with auto-submit) | 2.1.0           |
| `9001101011111111` | Fail authentication with 3DS Method and Challenge. (with auto-submit) | 2.2.0           |
| `9000100111111111` | Card not enrolled. Should fallback to 3D1.                            |                 |
| `9000100511111111` | Frictionless authentication with 3DS Method.                          | 2.1.0           |
| `9001100511111111` | Frictionless authentication with 3DS Method.                          | 2.2.0           |
| `9000100611111111` | Frictionless authentication without 3DS Method.                       | 2.1.0           |
| `9001100611111111` | Frictionless authentication without 3DS Method.                       | 2.2.0           |