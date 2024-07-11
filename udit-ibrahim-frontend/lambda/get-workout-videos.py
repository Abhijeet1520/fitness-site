
import json
import boto3
from botocore.exceptions import ClientError

print('Loading function')

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Ensure the event contains the 'titles' key
    if 'titles' not in event:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps({'error': 'Missing titles in the event'})
        }

    titles = event['titles']
    images = []

    for title in titles:
        try:
            key = "altemira-web/videos/" + title + ".m4v"
            # Generate a pre-signed URL for the image
            url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': 'altemira-fitness-main-01', 'Key': key},
                ExpiresIn=3600  # URL expires in 1 hour (you can adjust this)
            )
            images.append(url)
        except ClientError as e:
            print(e)
            images.append(f"Error generating URL for {title}: {str(e)}")

    resp = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps({'images': images})
    }

    print("Response: ", resp)
    
    return resp
