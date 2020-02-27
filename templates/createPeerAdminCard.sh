#!/bin/bash

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
# http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

Usage() {
	echo ""
	echo "Usage: ./createPeerAdminCard.sh [-h host] [-n]"
	echo ""
	echo "Options:"
	echo -e "\t-h or --host:\t\t(Optional) name of the host to specify in the connection profile"
	echo -e "\t-n or --noimport:\t(Optional) don't import into card store"
	echo ""
	echo "Example: ./createPeerAdminCard.sh"
	echo ""
	exit 1
}

Parse_Arguments() {
	while [ $# -gt 0 ]; do
		case $1 in
			--help)
				HELPINFO=true
				;;
			--host | -h)
                shift
				HOST="$1"
				;;
            --noimport | -n)
				NOIMPORT=true
				;;
		esac
		shift
	done
}

# Main = Anchor peer address:

HOST=<Main IP> 
SECOND_HOST=<Second IP>
THIRD_HOST=<Third IP>
FOURTH_HOST=<Fourth IP>
FIFTH_HOST=<Fifth IP>
SIXTH_HOST=<Sixth IP>

Parse_Arguments $@

if [ "${HELPINFO}" == "true" ]; then
    Usage
fi

# Grab the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "${HL_COMPOSER_CLI}" ]; then
  HL_COMPOSER_CLI=$(which composer)
fi

echo
# check that the composer command exists at a version >v0.16
COMPOSER_VERSION=$("${HL_COMPOSER_CLI}" --version 2>/dev/null)
COMPOSER_RC=$?

if [ $COMPOSER_RC -eq 0 ]; then
    AWKRET=$(echo $COMPOSER_VERSION | awk -F. '{if ($2<20) print "1"; else print "0";}')
    if [ $AWKRET -eq 1 ]; then
        echo Cannot use $COMPOSER_VERSION version of composer with fabric 1.2, v0.20 or higher is required
        exit 1
    else
        echo Using composer-cli at $COMPOSER_VERSION
    fi
else
    echo 'No version of composer-cli has been detected, you need to install composer-cli at v0.20 or higher'
    exit 1
fi

cat << EOF > DevServer_connection.json
{
    "name": "hlfv1",
    "x-type": "hlfv1",
    "x-commitTimeout": 1200,
    "version": "1.0.0",
    "client": {
        "organization": "Org1",
        "connection": {
            "timeout": {
                "peer": {
                    "endorser": "1200",
                    "eventHub": "1200",
                    "eventReg": "1200"
                },
                "orderer": "1200"
            }
        }
    },
    "channels": {
        "composerchannel": {
            "orderers": [
                "orderer.example.com"
            ],
            "peers": {
                "peer0.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                },
               "peer1.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                },
		"peer2.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                },
		"peer3.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                },
		"peer4.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                },
		"peer5.org1.example.com": {
                   "endorsingPeer": true,
                   "chaincodeQuery": true,
                   "eventSource": true
                }
            }
        }
    },
    "organizations": {
        "Org1": {
            "mspid": "Org1MSP",
            "peers": [
                "peer0.org1.example.com",
                "peer1.org1.example.com",
                "peer2.org1.example.com",
                "peer3.org1.example.com",
                "peer4.org1.example.com",
                "peer5.org1.example.com"
            ],
            "certificateAuthorities": [
                "ca.org1.example.com"
            ]
        }
    },
    "orderers": {
        "orderer.example.com": {
            "url": "grpc://${HOST}:7050",
            "grpcOptions": {
               "ssl-target-name-override": "orderer.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        }
    },
    "peers": {
        "peer0.org1.example.com": {
            "url": "grpc://${HOST}:7051",
            "eventUrl": "grpc://${HOST}:7053",
            "grpcOptions": {
                "ssl-target-name-override": "peer0.org1.example.com"
            },
            "tlsCACerts": {
                "pem": ""
            }
        },
        "peer1.org1.example.com": {
           "url": "grpc://${SECOND_HOST}:8051",
           "eventUrl": "grpc://${SECOND_HOST}:8053",
           "grpcOptions": {
               "ssl-target-name-override": "peer1.org1.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        },
        "peer2.org1.example.com": {
           "url": "grpc://${THIRD_HOST}:9051",
           "eventUrl": "grpc://${THIRD_HOST}:9053",
           "grpcOptions": {
               "ssl-target-name-override": "peer2.org1.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        },
        "peer3.org1.example.com": {
           "url": "grpc://${FOURTH_HOST}:10051",
           "eventUrl": "grpc://${FOURTH_HOST}:10053",
           "grpcOptions": {
               "ssl-target-name-override": "peer3.org1.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        },
        "peer4.org1.example.com": {
           "url": "grpc://${FIFTH_HOST}:11051",
           "eventUrl": "grpc://${FIFTH_HOST}:11053",
           "grpcOptions": {
               "ssl-target-name-override": "peer4.org1.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        },
        "peer5.org1.example.com": {
           "url": "grpc://${SIXTH_HOST}:12051",
           "eventUrl": "grpc://${SIXTH_HOST}:12053",
           "grpcOptions": {
               "ssl-target-name-override": "peer5.org1.example.com"
           },
           "tlsCACerts": {
               "pem": ""
           }
        }
    },
    "certificateAuthorities": {
        "ca.org1.example.com": {
            "url": "http://${HOST}:7054",
            "caName": "ca.org1.example.com"
        }
    }
}
EOF

PRIVATE_KEY="${DIR}"/composer/<Priv Key of CA>
CERT="${DIR}"/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem

if [ "${NOIMPORT}" != "true" ]; then
    CARDOUTPUT=/tmp/PeerAdmin@hlfv1.card
else
    CARDOUTPUT=PeerAdmin@hlfv1.card
fi

"${HL_COMPOSER_CLI}"  card create -p DevServer_connection.json -u PeerAdmin -c "${CERT}" -k "${PRIVATE_KEY}" -r PeerAdmin -r ChannelAdmin --file $CARDOUTPUT

if [ "${NOIMPORT}" != "true" ]; then
    if "${HL_COMPOSER_CLI}"  card list -c PeerAdmin@hlfv1 > /dev/null; then
        "${HL_COMPOSER_CLI}"  card delete -c PeerAdmin@hlfv1
    fi

    "${HL_COMPOSER_CLI}"  card import --file /tmp/PeerAdmin@hlfv1.card 
    "${HL_COMPOSER_CLI}"  card list
    echo "Hyperledger Composer PeerAdmin card has been imported, host of fabric specified as '${HOST}'"
    rm /tmp/PeerAdmin@hlfv1.card
else
    echo "Hyperledger Composer PeerAdmin card has been created, host of fabric specified as '${HOST}'"
fi
